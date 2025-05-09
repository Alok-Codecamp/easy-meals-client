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
import providerBnrD from '@/assets/provider-banner-desktop.png';
import providerBnrT from '@/assets/provider-banner-tab.jpg';
import providerBnrM from '@/assets/provider-banner-mobile.png';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Footer from '../shared/Footer';
import Link from 'next/link';
const Home = () => {
    return (
        <main>
            <NavBar />
            <header>
                {/* nav bar section  */}

                {/* banner section  */}
                <section className=''>
                    <div className='hidden lg:block'>
                        <Image src={bannerDesktop} alt='dexktop' className='hidden lg:block h-[450px]' />
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
            <section className='my-10 text-center border mx-16'>
                <h1 className='text-4xl font-bold text-gray-800'>A Higher Standard</h1>
                <div className='md:flex justify-center space-x-16 items-center my-10'>
                    <Card className='w-66 h-fit py-0'>
                        <CardHeader className='text-center'>
                            <div className='my-0'>
                                <Image src={cardImg1} alt='meal image' width={0} height={0} style={{ height: '100px', width: '260px' }} />
                            </div>
                            <CardTitle className='text-2xl font-bold text-gray-800 my-4'>Fresh meals & flavors</CardTitle>
                            <CardDescription className='text-gray-700 text-lg'>Get delicious, high-protein meals crafted by chefs and dietitians to support all diets.</CardDescription>
                        </CardHeader>

                    </Card>
                    <Card className='w-66 py-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={cardImg2} alt='meal image' width={0} height={0} style={{ height: '100px', width: '260px' }} />
                            </div>
                            <CardTitle className='text-2xl font-bold text-gray-800 my-4'>Organic Ingredients</CardTitle>
                            <CardDescription className='text-gray-700 text-lg'>Low sodium & macro balanced meals with ingredients sourced according the highest standards.</CardDescription>
                        </CardHeader>

                    </Card>
                    <Card className='w-66 py-0'>
                        <CardHeader className='text-center'>
                            <div className=''>
                                <Image src={cardImg3} alt='meal image' width={0} height={0} style={{ height: '100px', width: '260px' }} />
                            </div>
                            <CardTitle className='text-2xl font-bold text-gray-800 my-4'>All the tools for fitness</CardTitle>
                            <CardDescription className='text-gray-700 text-lg'>Download our ground breaking app for a personalized plan and intuitive weight loss tools.</CardDescription>
                        </CardHeader>
                    </Card>
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
