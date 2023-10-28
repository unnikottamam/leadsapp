import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
    function middleware(req) {
        if (req.nextUrl.pathname.startsWith("/users") && req.nextauth.token?.role !== "ADMIN") {
            return NextResponse.rewrite(
                new URL('/auth/login?message=You are not authorized', req.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        }
    }
)

export const config = {
    matcher: ["/:path*"]
}