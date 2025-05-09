import { NextRequest, NextResponse } from "next/server";
import { DecodedUser } from "./src/types/auth.types";
import verifyToken from "./src/utils/verifyToken";

// https://easy-meals-silk.vercel.app
const authRoutes = ["/login", "/register"];
const roleBaseAccess = {
    customer: [/^\/dashboard/, /^\/profile/, /^\/order-meal/],
    mealProvider: [/^\/dashboard/, /^\/profile/],
};
console.log('hello m');
export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const token: string | undefined = request.cookies.get("refreshToken")?.value
    const userInfo = verifyToken(token as string) as DecodedUser
    console.log(userInfo);
    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {

            return NextResponse.redirect(
                new URL(`/login?redirectPath=${pathname}`, request.url));
        }
    }

    if (userInfo?.role && roleBaseAccess[userInfo?.role]) {
        const routes = roleBaseAccess[userInfo?.role];
        console.log(userInfo);
        if (
            routes.some((route) => {
                return pathname.match(route);
            })
        ) {
            if (
                pathname.startsWith("/dashboard/provider") &&
                userInfo.role !== "mealProvider"
            ) {
                return NextResponse.redirect(new URL("/", request.url));
            } else if (
                pathname.startsWith("/dashboard/customer") &&
                userInfo.role !== "customer"
            ) {
                return NextResponse.redirect(new URL("/", request.url));
            } else {
                return NextResponse.next();
            }
        }
    }
    return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/profile/:path*",
        "/order-meal",
        "/order-meal/:path*",
    ],
};
