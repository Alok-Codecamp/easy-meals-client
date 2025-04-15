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
import z from 'zod';
import resetPasswordValidation from './resetPasswordValidaton';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValue = z.infer<typeof resetPasswordValidation>;
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
        watch,
        formState: { errors }
    } = useForm<FormValue>({ resolver: zodResolver(resetPasswordValidation) });
    const password = watch('newPassword');
    const confirmPassword = watch('confirmPassword');
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
                <div className=' bg-white/90 shadow-lg w-fit h-fit px-10 py-6 text-green-800 mx-auto rounded-md'>
                    <h1 className='text-center text-2xl mx-2'>Reset Password</h1>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}</p> : <p className="text-white text-sm text-left">{resPonse}</p>
                    }

                    <form onSubmit={handleSubmit(onSumbimt)}>
                        <label htmlFor="new-password">New Password</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("newPassword")} id='new-password' />
                        {errors?.newPassword?.message && <p className='text-red-500 text-sm h-1'>{errors?.newPassword?.message}</p>}
                        <br />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("confirmPassword")} id='confirm-password' />
                        {errors.confirmPassword?.message && <p className='text-red-500 text-sm h-1'>{errors.confirmPassword?.message}</p>}
                        <br />

                        {
                            isLoading ? <div className='text-center bg-green-900 my-2 h-8 w-64 md:w-80 rounded-md cursor-progress flex justify-center items-center'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 w-64 md:w-80 h-8 my-2 rounded-md cursor-pointer text-white' type="submit" value="Reset Password" />
                        }
                    </form>
                </div>
            </div >
        </div >
    )
}


export default ResetPasswordPage;












