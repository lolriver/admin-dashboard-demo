import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isOnAuth = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");

    // Redirect to login if not authenticated and trying to access dashboard
    if (isOnDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirect to dashboard if authenticated and trying to access auth pages
    if (isOnAuth && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard/overview", req.nextUrl));
    }

    // Redirect root to dashboard or login
    if (req.nextUrl.pathname === "/") {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard/overview", req.nextUrl));
        }
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
