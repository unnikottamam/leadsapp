import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { clientSchema } from "../../validationSchemas/clients";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const clients = await prisma.client.findMany({
        where: { archive: false },
        orderBy: { id: 'desc' }
    });
    return NextResponse.json(clients);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    let body = await request.json();
    const leadId = body.leadId || null;
    if (leadId) {
        const lead = await prisma.lead.findUnique({
            where: { id: leadId }
        });
        if (!lead) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }
        body = {
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone,
        }
    }
    const validation = clientSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const client = await prisma.client.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
        }
    });

    const leads = await prisma.lead.updateMany({
        where: { email: body.email },
        data: { ...{ clientId: client.id } }
    });

    return NextResponse.json(client, { status: 201 })
}