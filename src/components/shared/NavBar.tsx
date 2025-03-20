"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";

const NavBar = () => {
    const [open, setOpen] = useState(false)
    const sidebarRef = useRef<HTMLElement>(null);
    // console.log(open);
    // useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
    //             console.log('hello');
    //             setOpen(false)
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         console.log('gelo');
    //         document.removeEventListener('mousedown', handleClickOutside)
    //     }
    // }, [])
    return (
        <nav className="py-2 md:py-6 md:shadow-sm">
            {/* desktop menu  */}
            <section className="container mx-auto px-2  flex justify-between items-center">
                {/* nav Items  */}
                <div className="flex justify-center items-center space-x-12">
                    <Link className="border " href='/'>
                        <Image src="/logo.png" alt="logo" height={100} width={200} />
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        <li>Weekly Meny</li>
                        <li>Plans</li>
                        <li>About Us</li>
                        <li>Reviews</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                {/* search and Login  */}
                <div className="hidden md:block border">
                    <input type="text" placeholder="Search Meals" />
                    <Link href='/login'>Login</Link>
                </div>
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    <HiBars3BottomRight size={36} />
                </button>
            </section>
            {/* mobile menu  */}
            {
                open && <section ref={sidebarRef} className="bg-gray-50 shadow-sm text-left border-2 w-fit px-4 py-16 h-full fixed left-34 z-10">
                    <div className="md:hidden ">
                        <input className="border border-gray-400 rounded-2xl px-2 py-1" type="text" placeholder="Search Meals" />

                    </div>
                    <ul className="md:hidden text-xl ">
                        <li className="my-4">Weekly Meny</li>
                        <li className="my-4">Plans</li>
                        <li className="my-4">About Us</li>
                        <li className="my-4">Reviews</li>
                        <li className="my-4">FAQs</li>
                        <li className="my-4"> <Link href='/login'>Login</Link></li>
                    </ul>
                </section>
            }
        </nav>
    )
}


export default NavBar;



// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-blue-600 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <a href="/" className="text-2xl font-bold">
//           EasyMeals
//         </a>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex space-x-6">
//           <li><a href="/" className="hover:underline">Home</a></li>
//           <li><a href="/about" className="hover:underline">About</a></li>
//           <li><a href="/menu" className="hover:underline">Menu</a></li>
//           <li><a href="/contact" className="hover:underline">Contact</a></li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <ul className="md:hidden mt-4 space-y-3 text-center bg-blue-700 p-4 rounded-lg">
//           <li><a href="/" className="block hover:underline">Home</a></li>
//           <li><a href="/about" className="block hover:underline">About</a></li>
//           <li><a href="/menu" className="block hover:underline">Menu</a></li>
//           <li><a href="/contact" className="block hover:underline">Contact</a></li>
//         </ul>
//       )}
//     </nav>
//   );
// }
