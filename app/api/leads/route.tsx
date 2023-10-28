import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { leadSchema } from "../../validationSchemas/leads";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const leads = await prisma.lead.findMany({
        where: { archive: false },
        orderBy: { id: 'desc' }
    });
    return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const userExists = await prisma.client.findUnique({
        where: {
            email: body.email
        }
    });

    const lead = await prisma.lead.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            clientId: userExists ? userExists.id : undefined,
        }
    });

    if (body.message) {
        const comment = await prisma.comment.create({
            data: {
                comment: body.message,
                leadId: lead.id,
                clientId: userExists ? userExists.id : undefined,
            }
        });
    }

    return NextResponse.json(lead, { status: 201 })
}