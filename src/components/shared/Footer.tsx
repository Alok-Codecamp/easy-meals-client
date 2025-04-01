import Link from 'next/link';
import React from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import { FiYoutube } from 'react-icons/fi';
import { LuFacebook } from 'react-icons/lu';

const Footer = () => {
    return (
        <div className='px-16 my-10'>
            {/* branding section  */}
            {/* <section></section> */}
            {/* social link and contact section  */}
            <div className='bg-green-800 h-2 my-4 '></div>
            <section className=' md:flex justify-between items-center'>
                {/* about sectin  */}
                <div>
                    <h1 className='text-gray-800 text-xl mb-4'>About easy meals</h1>
                    <div className='md:flex justify-center items-start'>

                        <ul className='mr-10'>
                            <li>Our Story</li>

                            <li>Trifecta Health</li>

                            <li>Partners</li>

                            <li>How it Works</li>

                            <li>Careers</li>

                            <li>Accessibility Support</li>
                        </ul>
                        <ul className='ml-10'>
                            <li>Nutrition & Fitness</li>
                            <li>Meals</li>
                            <li>Testimonials</li>
                            <li>Press</li>
                            <li>Team Nutrition</li>
                        </ul>
                    </div>
                </div>
                {/* contact section  */}
                <div>
                    <h1>Contact</h1>
                    <ul>
                        <li>530-564-8388</li>
                        <li>Live Chat 8-5 PST</li>
                        <li>info@easymealsnutrition.com</li>
                    </ul>
                </div>

            </section>
            {/* social link and terms  */}
            <section className='my-8 text-gray-700 text-sm md:flex justify-between items-center'>
                <div>
                    <p>
                        <Link href="/">Privacy Policy</Link> | <Link href="/">Cookie Notice</Link> | <Link href="/">Your California Privacy Rights</Link> | <Link href="/">Do Not Sell My Personal Information</Link>
                    </p>
                    <p>
                        &copy; Copyright 2025 Trifecta Inc. All rights reserved | <Link href="/">Terms of Service</Link> | <Link href="/">FAQ</Link>
                    </p>
                </div>
                <div className='flex justify-center items-center'>
                    <BsInstagram size={40} className='mx-4' />
                    <FaXTwitter size={40} className='mx-4' />
                    <LuFacebook size={40} className='mx-4' />
                    <FiYoutube size={40} className='mx-4' />


                </div>
            </section>
        </div>
    );
}

export default Footer;
