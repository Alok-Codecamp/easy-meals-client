"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";

const NavBar = () => {
    const [open, setOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (open) {
            setIsAnimating(true); // Start animation when sidebar opens
        }
    }, [open]);


    return (
        <nav className="py-2 md:py-6 md:shadow-sm">
            {/* desktop menu  */}
            <section className="container mx-auto px-2  flex justify-between items-center">
                {/* nav Items  */}
                <div className="flex justify-center items-center space-x-12">
                    <Link className="border " href='/'>
                        <Image src="/logo.png" alt="logo" height={100} width={200} />
                    </Link>
                    <ul className="hidden lg:flex space-x-6">
                        <li>Weekly Menu</li>
                        <li>Plans</li>
                        <li>About Us</li>
                        <li>Reviews</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                {/* search and Login  */}
                <div className="hidden lg:flex justify-center items-center" >
                    <div className="mr-12">
                        <input
                            className="border border-gray-300 rounded-3xl 
                        px-2 py-1 mr-6"
                            type="text" placeholder="Search Meals" />
                        <IoIosSearch className="inline -ml-14" color="Gray" />

                    </div>
                    <Link href='/make-plan'
                        className="bg-green-800 px-10 
                        pt-1 pb-2 
                        rounded-3xl 
                        mr-2 text-white"
                    >get start</Link>
                    <Link href='/login'
                        className="bg-green-800 px-6 pt-1 pb-2 
                        rounded-3xl 
                        ml-2
                        text-white"
                    >Login</Link>
                </div>
                <button className="lg:hidden cursor-pointer hover:bg-gray-300 rounded-md" onClick={() => setOpen(!open)}>
                    <HiBars3BottomRight size={36} />
                </button>
            </section>
            {/* mobile menu  */}
            {
                open && (<section className={`lg:hidden bg-gray-200 shadow-sm text-left w-80 px-4 py-16 h-full fixed right-0 z-10
                 
          ${(open) ? "animate-in slide-in-from-right" : "animate-out slide-out-to-right"}`}

                >
                    <div className="">
                        <input className="border border-gray-400 rounded-2xl px-2 py-1" type="text" placeholder="Search Meals" />

                    </div>
                    <ul className=" text-xl ">
                        <li className="my-4">Weekly Meny</li>
                        <li className="my-4">Plans</li>
                        <li className="my-4">About Us</li>
                        <li className="my-4">Reviews</li>
                        <li className="my-4">FAQs</li>
                        <li className="my-4"> <Link href='/login'
                            className="bg-green-800 px-4 pt-0.5 pb-1
                             
                        rounded-3xl 
                        
                        text-white"
                        >Login</Link></li>
                    </ul>
                </section>
                )}
        </nav>
    )
}


export default NavBar;
