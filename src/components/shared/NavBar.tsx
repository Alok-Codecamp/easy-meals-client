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
import { deleteCoockies } from "@/services/auth/auth";
import { prodetectedRoutes } from "@/constants";
import { DecodedUser } from "@/types/auth.types";
import SearchBar from "../searchBar/SearchBar";
import { FaCartShopping } from "react-icons/fa6";
import { megaMenu } from "./constants";
import avatar from "@/assets/avatar.jpg"
import { getMyCart } from "@/redux/features/cart/cartSilse";



const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const user = useAppSelector(selectCurrentUser) as DecodedUser;
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const cart = useAppSelector(getMyCart);
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
        <nav className={`md:shadow-sm sticky z-50 top-0 bg-[#004B22]`}>

            {/* desktop menu  */}
            <section className={` container mx-auto px-2  flex justify-between items-center ${scrolled && 'md:hidden'} text-white`}>
                {/* nav Items  */}

                <div className="flex justify-center items-center">
                    <Link className="" href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={80}
                            height={80}
                            unoptimized

                        />
                    </Link>

                    <div className="hidden md:block">
                        <SearchBar />
                    </div>

                    <ul className="hidden lg:flex space-x-4">
                        <li>
                            <Link href="/find-meals">Find Meals</Link>
                        </li>

                        <li>
                            <Link href='/our-cehfs'>Our Chefs</Link>
                        </li>
                        <li>
                            <Link href={"about-us"}>About Us</Link>
                        </li>
                        <li>
                            {isMounted && user ? (
                                <Link href={user.role === 'mealProvider' ? '/dashboard/provider' : '/dashboard/customer'}>
                                    Dashboard
                                </Link>
                            ) : (<div className="w-16"></div>)}
                        </li>
                    </ul>
                </div>


                {/* search and Login  */}
                <div className="hidden lg:flex justify-center items-center space-x-6">
                    {isMounted && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-full">
                                <Image src={avatar} alt="avatar" height={30} width={30} className="rounded-full" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><Link href={user?.role === 'mealProvider' ? '/profile/provider' : '/profile/customer'}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <button onClick={handleLogOut} className="bg-red-800 px-6 pt-1 pb-2 rounded-3xl ml-2 text-white cursor-pointer">Logout</button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <span

                            className="text-white">
                            <Link href='/login'>Login</Link> | <Link href='/register'>Register</Link>
                        </span>
                    )}
                    <Link className="mr-1 text-12px flex items-center justify-center " href="/"><span className="relative -top-4 left-4 text-red-200 text-lg font-bold  ">{cart.length + 1}</span><FaCartShopping size={20} /> cart</Link>
                </div>

                <button
                    className="lg:hidden cursor-pointer hover:bg-gray-300 rounded-md"
                    onClick={() => setOpen(!open)}
                >
                    <HiBars3BottomRight size={36} />
                </button>

            </section>
            <ul className={`${scrolled ? 'hidden' : 'hidden md:flex justify-start items-center space-x-9'}  mt-1 bg-gray-200 py-2 pl-14`}>
                {
                    megaMenu.map((item: string) => (
                        <li key={item}>
                            <Link href={`/find-meals?category=${item.toLowerCase()}`}>{item}</Link>
                        </li>
                    ))
                }
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
                <section className="hidden md:block bg-[#004B22] py-2 pl-16 animate-in slide-in-from-top transition-all duration-500"><ul className="flex justify-start items-center space-x-9 text-white">
                    <li>Keto</li>
                    <li>Vegan</li>
                    <li>Vegetarian</li>
                    <li>Gluten-Free</li>
                    <li>Low-Carb</li>
                    <li>High-Protein</li>
                    <li>Paleo</li>
                    <li>Diabetic-Friendly</li>
                    <li>Dairy-Free</li>
                    <li>Organic</li>
                    <li>Low-Fat</li>
                    <li>Heart-Healthy</li>
                    <Link className="mr-1 text-12px flex items-center justify-center " href="/"><span className="relative -top-4 left-4 text-red-200 text-lg font-bold  ">{cart.length + 1}</span><FaCartShopping size={20} /> cart</Link>
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
