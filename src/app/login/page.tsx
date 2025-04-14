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
import { toast } from 'sonner';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { ClockLoader } from 'react-spinners'
import NavBar from '@/components/shared/NavBar';
type FormValue = {
    contact: string;
    password: string;
}
const Page = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser)
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const router = useRouter();
    const errorMessage = error && (error as any)?.data?.message;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValue>();
    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        const toastId = toast.loading('login in...')
        const userData = await login(data);
        const token = userData?.data?.data?.accessToken
        const userInfo = verifyToken(token)
        console.log(userInfo);

        if (userInfo) {
            toast.success('Login successfully', { id: toastId })
            dispatch(setUser({ user: userInfo, token: token }))
        }

        router.push('/')

    }
    console.log(user);
    // bg-[#004B22]
    return (
        <div>
            <NavBar />
            <div className={`${styles.loginPageContainer}  flex justify-between items-center space-x-8 h-screen `}>

                {/* <div>
                <Image src={mealImage} alt='login page' width={1000} height={100} />
            </div> */}
                <div className='backdrop-blur-md bg-white/20 w-fit h-80 px-6 py-6 text-white mx-auto rounded-sm'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Sign In</h1>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}!</p> : <></>
                    }

                    <form className=' text-center' onSubmit={handleSubmit(onSumbimt)}>
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("contact")} placeholder='Email or Phone' />
                        <br />
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("password")} placeholder='Password' />

                        <div className='text-left mb-4'>
                            <Link className='text-sm' href='/forgetPassword'>Forget Password?</Link>
                        </div>


                        {
                            isLoading ? <div className='bg-green-900 px-16 py-1 rounded-md cursor-progress w-fit mx-auto'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 px-16 py-1 rounded-md cursor-pointer' type="submit" />
                        }


                    </form>
                    <div className='text-center'>
                        <p className='text-gray-200 text-sm my-4 '>Don't have an account <Link className=' underline decoration-2 decoration-green-200' href={'/register'}>signup</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
