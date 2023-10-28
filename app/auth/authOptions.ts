import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword!
                );
                return passwordsMatch ? user : null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return ({ ...token, ...user })
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        },
    },
    session: {
        strategy: 'jwt'
    }
}

export default authOptions;