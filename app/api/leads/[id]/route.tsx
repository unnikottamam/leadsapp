import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { leadPatchSchema } from "../../../validationSchemas/leads";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const lead = await prisma.lead.findUnique({
        where: { id: params.id }
    });
    if (!lead) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(lead);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = leadPatchSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const lead = await prisma.lead.findUnique({
        where: { id: params.id }
    });
    if (!lead) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
        where: { id: lead.id },
        data: { ...body }
    });
    return NextResponse.json(updatedLead);
}