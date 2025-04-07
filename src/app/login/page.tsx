"use client"
import Image from 'next/image';
import React from 'react';
import styles from './login.module.css'
import mealImage from '@/assets/loginPage.png'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import loginUser from '@/components/authentication/login/LoginUser';
import { selectCurrentUser, setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import verifyToken from '@/utils/verifyToken';
import { useRouter } from 'next/navigation';

type FormValue = {
    contact: string;
    password: string;
}
const Page = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValue>();
    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        console.log(user);
        const userData = await loginUser(data);
        const userInfo = verifyToken(userData.data.accessToken)
        console.log(userInfo);

        if (userInfo) {
            dispatch(setUser({ user: userInfo, token: userData.data.accessToken }))
        }

        router.push('/')

    }
    console.log(user);
    // bg-[#004B22]
    return (
        <div className={`${styles.loginPageContainer}  flex justify-between items-center space-x-8 h-screen `}>
            {/* <div>
                <Image src={mealImage} alt='login page' width={1000} height={100} />
            </div> */}
            <div className='backdrop-blur-md bg-white/20 w-fit h-80 px-6 py-8 text-white mx-auto rounded-sm'>
                <h1 className='text-center'>Sign In</h1>
                <form className=' text-center' onSubmit={handleSubmit(onSumbimt)}>
                    <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("contact")} placeholder='Email or Phone' />
                    <br />
                    <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("password")} placeholder='Password' />

                    <div className='text-left mb-4'>
                        <Link className='text-sm' href='/forgetPassword'>Forget Password?</Link>
                    </div>

                    <input className='bg-green-900 px-16 py-1 rounded-md cursor-pointer' type="submit" />

                </form>
            </div>
        </div>
    );
}

export default Page;
