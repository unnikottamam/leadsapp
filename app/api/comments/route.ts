import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { commentSchema } from "../../validationSchemas/comments";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const comments = await prisma.comment.findMany({
        orderBy: { id: 'desc' }
    });
    return NextResponse.json(comments);
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
    }

    const validation = commentSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const comment = await prisma.comment.create({
        data: {
            comment: body.comment,
            leadId,
        }
    });


    return NextResponse.json(comment, { status: 201 })
}