"use client"
import Image from 'next/image';
import React from 'react';
import styles from './login.module.css'
import mealImage from '@/assets/loginPage.png'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

type FormValue = {
    contact: string;
    password: string;
}
const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValue>();
    const onSumbimt: SubmitHandler<FormValue> = (data) => {
        console.log(data);
    }
    // bg-[#004B22]
    return (
        <div className={`${styles.loginPageContainer}  md:flex justify-between items-center space-x-8 h-screen `}>
            {/* <div>
                <Image src={mealImage} alt='login page' width={1000} height={100} />
            </div> */}
            <div className='backdrop-blur-md bg-white/20 w-fit h-80 px-6 py-8 text-white mx-auto'>
                <h1 className='text-center'>Sign In</h1>
                <form className=' text-center' onSubmit={handleSubmit(onSumbimt)}>
                    <input className='border-1 border-white rounded-md my-2 h-8 w-64 px-2'  {...register("contact")} placeholder='Email or Phone' />
                    <br />
                    <input className='border-1 border-white rounded-md my-2 h-8 w-64 px-2'  {...register("password")} placeholder='Password' />

                    <div className='text-left mb-4'>
                        <Link className='text-sm' href='/forgetPassword'>Forget Password?</Link>
                    </div>

                    <input className='bg-green-900 px-16 py-1 rounded-md' type="submit" />

                </form>
            </div>
        </div>
    );
}

export default Page;
