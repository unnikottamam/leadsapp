import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { userSchema } from "../../validationSchemas/user";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({}, { status: 401 });

    const users = await prisma.user.findMany({
        where: { archive: false },
        orderBy: { id: 'desc' }
    });
    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

    const user = await prisma.user.findUnique({
        where: { email: body.email }
    });
    if (user) return NextResponse.json({ error: 'User already exists' }, { status: 404 });

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            hashedPassword,
        }
    });

    return NextResponse.json(newUser.email, { status: 201 })
}