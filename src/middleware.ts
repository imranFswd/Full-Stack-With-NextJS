

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { default } from "next-auth/middleware"


/**
 * This function can b marked "async" if using awiat inside
 */

export async function middleware(request:NextRequest) {

    const token = await getToken({req: request})


    const url = request.nextUrl


    if (
        token && 
        (
            url.pathname.startsWith("/signup") ||
            url.pathname.startsWith("/signin") ||
            url.pathname.startsWith("/verify") ||
            url.pathname.startsWith("/")
        )
    ) {
        
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        )
    }


    if ( 
        !token && url.pathname.startsWith("/dashboard")
     ) {
        
        return NextResponse.redirect(
            new URL("/signin", request.url)
        )
    }

    
    return NextResponse.next()
}


/**
 * See "Matching paths" below to learn more
 */

export const config = {
    matcher: [
        "/",
        "/signup",
        "/signin",
        "/verify/:path*",
        "/dashboard/:path*",
    ]
}

