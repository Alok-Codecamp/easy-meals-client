"use client"
import Image from 'next/image';
import React from 'react';
import mealImage from '@/assets/loginPage.png'
import { SubmitHandler, useForm } from 'react-hook-form';

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

    return (
        <div className='bg-[#004B22] md:flex justify-between items-center space-x-8 h-screen'>
            <div>
                <Image src={mealImage} alt='login page' width={650} height={100} />
            </div>
            <div>
                <form onSubmit={handleSubmit(onSumbimt)}>
                    <input  {...register("contact")} placeholder='Email or Phone' />
                    <input  {...register("password")} placeholder='Password' />
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}

export default Page;
