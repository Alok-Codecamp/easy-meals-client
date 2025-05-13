"use client"
import NavBar from '../shared/NavBar';
import Image from 'next/image';
import bannerDesktop from '@/assets/banner-desktop.png';
import bannerMobile from '@/assets/banner-mobile.png';
import bannerTab from '@/assets/banner-tab.png';
import banner2 from '@/assets/banner2.png';
import easyStep1 from '@/assets/easyStep/step1.png'
import easyStep2 from '@/assets/easyStep/step2.png'
import easyStep3 from '@/assets/easyStep/step3.png'
import easyStep4 from '@/assets/easyStep/step4.png'
import providerBnrD from '@/assets/provider-banner-desktop.png';
import providerBnrT from '@/assets/provider-banner-tab.jpg';
import providerBnrM from '@/assets/provider-banner-mobile.png';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Footer from '../shared/Footer';
import Link from 'next/link';
import { useGetAllMealQuery } from '@/redux/features/meals/mealApi';
import { IMeal } from '@/types/meal';
import { Skeleton } from '../ui/skeleton';
import { FaStar } from 'react-icons/fa6';

const Home = () => {
    const { data: mealData, isLoading } = useGetAllMealQuery([]);
    console.log(mealData);
    return (
        <main>
            <NavBar />
            <header>
                {/* nav bar section  */}

                {/* banner section  */}
                <section className=''>
                    <div className='hidden lg:block'>
                        <Image src={bannerDesktop} alt='dexktop' className='hidden lg:block h-[400px]' />
                        <Link
                            href='/register'
                            className=' ml-16 -translate-x-1/2 bg-green-800 px-10 py-2 rounded-3xl text-white font-bold text-xl'
                        >
                            Join Now
                        </Link>
                    </div>
                    <div className='hidden md:block sm:hidden lg:hidden'>
                        <Image src={bannerTab} alt=' tab' width={1000} height={1080} className='hidden md:block sm:hidden lg:hidden' />
                        <Link
                            href='/register'
                            className=' -translate-x-1/2 text-white px-10 py-2 rounded-3xl bg-green-800 font-bold text-xl w-fit ml-96 mt-2  inline-block '
                        >
                            Join Now
                        </Link>
                    </div>
                    <div className='block md:hidden'>
                        <Image src={bannerMobile} width={600} height={700} alt='mobile' className='block md:hidden' />
                        <Link
                            href='/register'
                            className='ml-36 -translate-x-1/2 bg-green-800 px-10 py-2 rounded-3xl text-white '
                        >
                            Join Now
                        </Link>
                    </div>

                </section>


            </header>
            {/* featured section  */}
            <section className='my-10 text-center border mx-6 md:mx-16'>
                <h1 className='text-2xl font-bold text-gray-800'>Hot Picks in Healthy Eating</h1>
                <div className=' flex flex-col md:flex-row justify-center items-center space-x-4  my-10'>
                    {isLoading ? <div><Skeleton /></div> :
                        mealData?.data?.slice(0, 5).map((item: IMeal, index: number) => (
                            <Link key={index} href={`/order-meal/${item._id}`}>
                                <Card className='w-60 py-0 rounded-md'>
                                    <CardHeader className='text-center'>
                                        <Image src={item.image} alt='meal image' width={0} height={0} style={{ height: '150px', width: '250px' }} unoptimized className='rounded-md' />
                                        <div className="flex justify-between items-center mx-2">
                                            <p className=" text-green-900 text-sm font-bold">{item?.title}</p>
                                            <p className=" text-green-900 font-bold flex items-center"><FaStar className='text-yellow-400' />{item?.ratings?.average}</p>
                                        </div>
                                        <div className="flex justify-between items-center mx-2">
                                            <p className=" text-green-900 text-sm font-bold"></p>
                                            <p className=" text-green-900 font-bold flex items-center"><FaStar className='text-yellow-400' />{ }</p>
                                        </div>

                                    </CardHeader>

                                </Card>
                            </Link>
                        ))
                    }

                </div>
            </section>

            {/* choose meal and get start section  */}
            <section className='md:flex justify-center items-center mx-16 border'>

                <div className='text-center pr-6 mb-6'>

                    <h1 className='text-4xl font-bold text-gray-800'>MEET YOUR HEALTH GOALS WITH THE #1 MEAL KIT FOR CLEAN EATING</h1>
                    <p className='text-gray-800 mb-10'>Supports healthy weight management & whole body health.</p>
                    <Link href='/make-plan'
                        className=" bg-green-800 px-10 pt-1 pb-2 rounded-3xl text-white">get start</Link>
                </div>
                <div className='sm:block hidden '>
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


                <section className='text-left'>
                    <h1 className='text-center text-4xl font-bold text-gray-800'>Offer Your Meals</h1>
                    <div className='hidden lg:block'>
                        <Image src={providerBnrD} alt='dexktop' className='hidden lg:block h-[450px]' />
                        <Link
                            href='/register'
                            className=' bg-green-800 px-10 py-2 rounded-3xl text-white font-bold text-xl inline-block mt-2 ml-16'
                        >
                            Join Now
                        </Link>
                    </div>
                    <div className='hidden md:block sm:hidden lg:hidden'>
                        <Image src={providerBnrT} alt=' tab' width={1000} height={1080} className='hidden md:block sm:hidden lg:hidden' />
                        <Link
                            href='/register'
                            className=' text-white px-10 py-2 rounded-3xl bg-green-800 font-bold text-xl w-fit ml-56 mt-2  inline-block '
                        >
                            Join Now
                        </Link>
                    </div>
                    <div className='block md:hidden'>
                        <Image src={providerBnrM} width={600} height={700} alt='mobile' className='block md:hidden' />
                        <Link
                            href='/register'
                            className='ml-20 mt-2 inline-block bg-green-800 px-10 py-2 rounded-3xl text-white '
                        >
                            Join Now
                        </Link>
                    </div>

                </section>


            </section>
            {/* footer section  */}
            <footer className='border'>
                <Footer />
            </footer>
        </main>
    );
}

export default Home;
