import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth/auth"






const authRoutes = ["/login", "/register"]
const roleBaseAccess = {
    customer: [/^\/customer/, /^\/dashboard/, /^\/select-a-plan/],
    mealProvider: [/^\/mealProvider/]
}

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser();
    console.log(userInfo);

    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        }
        else {
            return NextResponse.redirect(new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url))
        }
    }

    if (userInfo?.role && roleBaseAccess[userInfo?.role]) {
        const routes = roleBaseAccess[userInfo?.role]
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next()
        }
    }
    return NextResponse.redirect(new URL('/', request.url))
}


export const config = {
    matcher: [
        "/dashboard",
        "/customer",
        "/customer/:page",
        "/mealProvider",
        "/mealProvider/:page",
        "/select-a-plan"
    ]
}