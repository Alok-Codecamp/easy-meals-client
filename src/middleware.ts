import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth/auth";

const authRoutes = ["/login", "/register"];
const roleBaseAccess = {
    customer: [/^\/dashboard/, /^\/profile/, /^\/order-meal/],
    mealProvider: [/^\/dashboard/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser();

    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {

            return NextResponse.redirect(
                new URL(
                    `http://localhost:3000/login?redirectPath=${pathname}`,
                    request.url
                )
            );
        }
    }

    if (userInfo?.role && roleBaseAccess[userInfo?.role]) {
        const routes = roleBaseAccess[userInfo?.role];

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
