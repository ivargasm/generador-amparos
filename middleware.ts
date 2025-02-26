import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");

    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    
    return NextResponse.next();
}

// Aplicar middleware solo en rutas protegidas
export const config = {
    matcher: ["/dashboard/:path*"],
};
