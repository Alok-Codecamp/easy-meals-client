"use client"
import React, { useState } from 'react';
import styles from './reset.module.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ClockLoader } from 'react-spinners'
import NavBar from '@/components/shared/NavBar';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';


type FormValue = {
    newPassword: string;
    confirmPassword: string;
    email: string | null;
    token: string | null;
}
const ResetPasswordPage = () => {
    const [resetPassword, { isError, isLoading, error }] = useResetPasswordMutation();
    const [resPonse, setResponse] = useState('Enter your new Password')
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    const errorMessage = error && (error as any)?.data?.message;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValue>();

    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        data.email = email;
        data.token = token;
        const toastId = toast.loading('Password reset processing...')
        const res = await resetPassword(data);

        console.log(res);

        if (res.data) {
            setResponse(res?.data?.message)
            toast.success(res?.data?.message, { id: toastId });
            router.push('/dashboard')
        } else {
            toast.error(toast.error((res as any)?.error?.message), { id: toastId })
        }

    }
    return (
        <div>
            <NavBar />
            <div className={`${styles.resetPasswordcontainer}  flex justify-between items-center space-x-8 h-screen `}>
                <div className='backdrop-blur-md bg-white/20 w-fit h-80 px-6 py-6 text-white mx-auto rounded-sm'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Reset Password</h1>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}</p> : <p className="text-white text-sm text-left">{resPonse}</p>
                    }

                    <form className=' text-center' onSubmit={handleSubmit(onSumbimt)}>
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-80 w-64 px-2'  {...register("newPassword")} placeholder='New Password' />
                        <br />
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-80 w-64 px-2'  {...register("confirmPassword")} placeholder='Confirm New Password' />
                        <br />

                        {
                            isLoading ? <div className='bg-green-900 px-16 py-1 rounded-md cursor-progress w-fit mx-auto'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div>
                                : <input className='bg-green-900 w-64 md:w-80 py-1 my-2 rounded-md cursor-pointer' value='Reset Password' type="submit" />
                        }
                    </form>
                </div>
            </div >
        </div >
    )
}


export default ResetPasswordPage;












