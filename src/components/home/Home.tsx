import React from 'react';
import NavBar from '../shared/NavBar';
import Image from 'next/image';
import bannerDesktop from '@/assets/banner-desktop.png';
import bannerMobile from '@/assets/banner-mobile.png';
import bannerTab from '@/assets/banner-tab.png';
const Home = () => {
    return (
        <main>

            <header>
                <NavBar />
                {/* banner section  */}
                <section className=''>
                    <Image src={bannerDesktop} alt='dexktop' className='hidden lg:block h-[450px]' />
                    <Image src={bannerTab} alt=' tab' width={1000} height={1080} className='hidden md:block sm:hidden lg:hidden' />
                    <Image src={bannerMobile} width={600} height={700} alt='mobile' className='block md:hidden' />

                </section>
            </header>
        </main>
    );
}

export default Home;
