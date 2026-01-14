import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export default async function Proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/login") && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!token && !pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/(dashboard)/:path*', '/(auth)/:path*'],
};
