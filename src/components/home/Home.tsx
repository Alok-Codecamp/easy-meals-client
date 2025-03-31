import React from 'react';
import NavBar from '../shared/NavBar';
import Image from 'next/image';
import bannerDesktop from '@/assets/banner-desktop.png';
import bannerMobile from '@/assets/banner-mobile.png';
import bannerTab from '@/assets/banner-tab.png';
import cardImg1 from '@/assets//heighlight/cardImg1.png';
import cardImg2 from '@/assets/heighlight/cardImg2.png';
import cardImg3 from '@/assets/heighlight/cardImg3 .png';
import banner2 from '@/assets/banner2.png';
import easyStep1 from '@/assets/easyStep/step1.png'
import easyStep2 from '@/assets/easyStep/step2.png'
import easyStep3 from '@/assets/easyStep/step3.png'
import easyStep4 from '@/assets/easyStep/step4.png'

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
                <h1 className='text-4xl font-bold text-gray-800'>A Higher Standard</h1>
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

            {/* choose meal and get start section  */}
            <section className='lg:flex justify-center items-center mx-16'>

                <div className='text-center pr-6'>

                    <h1 className='text-4xl font-bold text-gray-800'>MEET YOUR HEALTH GOALS WITH THE #1 MEAL KIT FOR CLEAN EATING</h1>
                    <p className='text-gray-800'>Supports healthy weight management & whole body health.</p>
                </div>
                <div className=''>
                    <Image src={banner2} alt='banner 2' width={800} height={100} className='h-[600px]' />
                </div>
            </section>

            {/* how easy meal cehf work section  */}
            <section className='text-center my-10 border mx-16'>
                <h4 className='text-gray-600 text-lg'>How CookUnity works</h4>
                <h1 className='text-center text-4xl font-bold text-gray-800'>A five-star experience <br />in four simple steps</h1>
                <div className='md:flex justify-center items-center space-x-16 mt-10 mb-10'>
                    <Card className='w-72 p-0'>
                        <CardHeader className='text-center'>
                            <div >
                                <Image src={easyStep1} alt='meal image' width={260} height={100} className='rounded-lg' />
                            </div>
                            <CardTitle className='text-xl font-bold text-gray-800 my-4 text-left'>Pick your weekly plan</CardTitle>
                            <CardDescription className='text-gray-700 text-sm text-left'>Choose from 4 to 16 meals per week – you can pause, skip, or cancel deliveries at any time.</CardDescription>
                        </CardHeader>

                    </Card>
                    <Card className='w-72 p-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={easyStep2} alt='meal image' width={260} height={100} className='rounded-lg' />
                            </div>
                            <CardTitle className='text-xl font-bold text-gray-800 my-4 text-left'>Select your meals</CardTitle>
                            <CardDescription className='text-gray-700 text-sm text-left'>Browse our menu and select your meals – new menus drop every week with exciting new offerings added all the time.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className='w-72 p-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={easyStep3} alt='meal image' width={260} height={100} className='rounded-lg' />
                            </div>
                            <CardTitle className='text-xl font-bold text-gray-800 my-4 text-left'>Let chefs work their magic</CardTitle>
                            <CardDescription className='text-gray-700 text-sm text-left'>Every meal is made to order in small batches with the craft and artistry offered only by top-tier chefs.

                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className='w-72 p-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={easyStep4} alt='meal image' width={260} height={100} className='rounded-lg' />
                            </div>
                            <CardTitle className='text-xl font-bold text-gray-800 my-4 text-left'>Sit back and enjoy

                            </CardTitle>
                            <CardDescription className='text-gray-700 text-sm text-left'>Delivered fresh every week, enjoy chef-crafted meals in minutes with no prep or cleanup.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </main>
    );
}

export default Home;
