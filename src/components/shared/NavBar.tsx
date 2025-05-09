"use client";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deleteCoockies } from "@/services/auth/auth";
import { prodetectedRoutes } from "@/constants";
import { DecodedUser } from "@/types/auth.types";



const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const user = useAppSelector(selectCurrentUser) as DecodedUser;
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        const handleScrolled = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScrolled)
        return () => window.removeEventListener('scroll', handleScrolled)
    }, []);
    // handle logout function 
    const handleLogOut = async () => {
        await deleteCoockies();
        dispatch(logOut());
        if (prodetectedRoutes.some((route) => pathname.match(route))) {
            router.push('/')
        }
    };


    return (
        <nav className={`${!scrolled && 'pt-2'} md:shadow-sm sticky top-0 bg-[#004B22]`}>

            {/* desktop menu  */}
            <section className={` container mx-auto px-2  flex justify-between items-center ${scrolled && 'hidden'} text-white`}>
                {/* nav Items  */}

                <div className="flex justify-center items-center">
                    <Link className=" " href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={0}
                            height={0}
                            unoptimized
                            style={{ height: '80px', width: "80px" }}
                        />
                    </Link>


                    <ul className="hidden lg:flex space-x-10 mx-10">
                        <li>
                            <Link href="/find-meals">Find Meals</Link>
                        </li>

                        <li>
                            <Link href='/our-cehfs'>Our Chefs</Link>
                        </li>



                        <li>
                            {isMounted && user && (
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
                <div className="hidden lg:block">
                    {isMounted && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>Profile</AvatarFallback>
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
            <ul className={`flex justify-start items-center space-x-20 mt-1 bg-gray-200 py-2 px-16 ${scrolled && 'hidden'}`}>
                <li>





                </li>

                <li>STANDARD</li>
                <li>SUBSCRIPTION</li>
                <li>PARTY MENU</li>
                <li>DIET</li>
            </ul>

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
            {scrolled && (
                <section className="bg-[#004B22] py-2 px-16 animate-in slide-in-from-top transition-all duration-500">

                    <ul className="flex justify-start items-center space-x-24 text-white">
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
                        <li>meal</li>
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
