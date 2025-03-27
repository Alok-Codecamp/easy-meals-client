import React from 'react';
import NavBar from '../shared/NavBar';
import Image from 'next/image';
import bannerDesktop from '@/assets/banner-desktop.png';
import bannerMobile from '@/assets/banner-mobile.png';
import bannerTab from '@/assets/banner-tab.png';
import cardImg1 from '@/assets//heighlight/cardImg1.png'
import cardImg2 from '@/assets/heighlight/cardImg2.png'
import cardImg3 from '@/assets/heighlight/cardImg3 .png'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
const Home = () => {
    return (
        <main>

            <header>
                {/* nav bar section  */}
                <NavBar />
                {/* banner section  */}
                <section className=''>
                    <Image src={bannerDesktop} alt='dexktop' className='hidden lg:block h-[450px]' />
                    <Image src={bannerTab} alt=' tab' width={1000} height={1080} className='hidden md:block sm:hidden lg:hidden' />
                    <Image src={bannerMobile} width={600} height={700} alt='mobile' className='block md:hidden' />

                </section>
            </header>
            {/* featured section  */}
            <section className='my-10 text-center'>
                <h1 className='text-3xl font-bold text-gray-800'>A Higher Standard</h1>
                <div className='md:flex justify-center space-x-16 items-center my-10'>
                    <Card className='w-66 h-fit py-0'>
                        <CardHeader className='text-center'>
                            <div className='my-0'>
                                <Image src={cardImg1} alt='meal image' width={260} height={100} />
                            </div>
                            <CardTitle className='text-2xl font-bold text-gray-800 my-4'>Fresh meals & flavors</CardTitle>
                            <CardDescription className='text-gray-700 text-lg'>Get delicious, high-protein meals crafted by chefs and dietitians to support all diets.</CardDescription>
                        </CardHeader>

                    </Card>
                    <Card className='w-66 py-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={cardImg2} alt='meal image' width={260} height={100} />
                            </div>
                            <CardTitle className='text-2xl font-bold text-gray-800 my-4'>Organic Ingredients</CardTitle>
                            <CardDescription className='text-gray-700 text-lg'>Low sodium & macro balanced meals with ingredients sourced according the highest standards.</CardDescription>
                        </CardHeader>

                    </Card>
                    <Card className='w-66 py-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={cardImg3} alt='meal image' width={260} height={100} />
                            </div>
                            <CardTitle className='text-2xl font-bold text-gray-800 my-4'>All the tools for fitness</CardTitle>
                            <CardDescription className='text-gray-700 text-lg'>Download our ground breaking app for a personalized plan and intuitive weight loss tools.</CardDescription>
                        </CardHeader>

                    </Card>
                </div>
            </section>
        </main>
    );
}

export default Home;
