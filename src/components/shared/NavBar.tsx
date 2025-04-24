"use client";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar from '@/assets/selectMeals/clean-meal.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deleteCoockies } from "@/services/auth/auth";
import { prodetectedRoutes } from "@/constants";
import { DecodedUser } from "@/types/auth.types";
import { Button } from "../ui/button";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const user = useAppSelector(selectCurrentUser) as DecodedUser;
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogOut = async () => {
        await deleteCoockies();
        dispatch(logOut());
        if (prodetectedRoutes.some((route) => pathname.match(route))) {
            router.push('/')
        }
    };
    if (!isMounted || status === 'loading') return null;
    return (
        <nav className="py-2 md:py-6 md:shadow-sm">
            {/* desktop menu  */}
            <section className="container mx-auto px-2  flex justify-between items-center">
                {/* nav Items  */}
                <div className="flex justify-center items-center space-x-12">
                    <Link className="border " href="/">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={200}
                            height={0}
                            sizes="100vw"
                        />
                    </Link>
                    <ul className="hidden lg:flex space-x-6">
                        <li>
                            <Link href="/find-meals">Find Meals</Link>
                        </li>

                        <li>
                            <Link href='/our-cehfs'>Our Chefs</Link>
                        </li>



                        <li>
                            {user && (
                                <Link href={user.role === 'mealProvider' ? '/dashboard/provider' : '/dashboard/customer'}>
                                    Dashboard
                                </Link>
                            )}
                        </li>
                        <li>
                            <Link href={"about-us"}>About Us</Link>
                        </li>

                    </ul>
                </div>
                {/* search and Login  */}
                <div className="hidden lg:flex justify-center items-center">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AB</AvatarFallback>
                                </Avatar>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href={user?.role === 'mealProvider' ? '/profile/provider' : '/profile/customer'}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <button onClick={handleLogOut} className="bg-red-800 px-6 pt-1 pb-2 rounded-3xl ml-2 text-white cursor-pointer">Logout</button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-green-800 px-6 pt-1 pb-2 
                    rounded-3xl 
                    ml-2
                    text-white"
                        >
                            Sign In/Sign Up
                        </Link>
                    )}
                </div>
                <button
                    className="lg:hidden cursor-pointer hover:bg-gray-300 rounded-md"
                    onClick={() => setOpen(!open)}
                >
                    <HiBars3BottomRight size={36} />
                </button>
            </section>
            {/* mobile menu  */}
            {open && (
                <section
                    className={`lg:hidden bg-gray-200 shadow-sm text-left w-80 px-4 py-16 h-full fixed right-0 z-10
                 
          ${open
                            ? "animate-in slide-in-from-right"
                            : "animate-out slide-out-to-right"
                        }`}
                >
                    <div className="">
                        <input
                            className="border border-gray-400 rounded-2xl px-2 py-1"
                            type="text"
                            placeholder="Search Meals"
                        />
                    </div>
                    <ul className=" text-xl ">
                        <li className="my-4">Weekly Meny</li>
                        <li className="my-4">Plans</li>
                        <li className="my-4">About Us</li>
                        <li className="my-4">Reviews</li>
                        <li className="my-4">FAQs</li>
                        <li className="my-4">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    href="/login"
                                    className="bg-green-800 px-4 pt-0.5 pb-1 rounded-3xl text-white"
                                >
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </section>
            )}
        </nav>
    );
};
{
    /* <button onClick={handleLogOut}
   className="bg-red-800 px-6 pt-1 pb-2 
   rounded-3xl ml-2 text-white cursor-pointer">Logout</button> */
}

export default NavBar;
