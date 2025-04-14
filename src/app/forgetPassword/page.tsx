"use client"
import NavBar from "@/components/shared/NavBar"
import styles from "./forgetPassword.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";
import Link from "next/link";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordValidationSchema } from "./forgetPasswordValidation";



type FormValue = {
    email: string;
}
const ForgetPasswordPage = () => {
    const [forgetPassword, { isLoading, isError, error }] = useForgetPasswordMutation();
    const [response, setResponse] = useState('Enter your email for reset password');
    const errorMessage = error && (error as any)?.data?.message;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormValue>({ resolver: zodResolver(forgetPasswordValidationSchema) });

    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        console.log(data);
        const toastId = toast.loading('please wait...');
        try {
            const res = await forgetPassword(data);
            console.log(res);
            if (res.data) {
                setResponse(res.data?.message)
                toast.success("We've sent a password reset link to your email. Please check your inbox.!", { id: toastId })
                reset();
            } else {
                toast.error(`password forget faild`, { id: toastId })
                reset();
            }
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong', { id: toastId });
        }
    }
    return (
        <div>
            <NavBar />
            <div className={`${styles.registerPageContainer}  flex justify-between items-center space-x-8 h-screen `}>
                <div className='bg-white/90 shadow-lg w-fit h-fit px-10 py-6 text-green-800 mx-auto rounded-md'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Reset your Password</h1>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}!</p> : <p className="text-white text-sm text-left">{response}</p>
                    }
                    <form onSubmit={handleSubmit(onSumbimt)}>
                        <label>Email</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("email")} type="email" />
                        {
                            errors.email?.message && <p className='text-red-800 text-sm h-1'>{errors.email.message}</p>
                        }
                        <br />
                        {
                            isLoading ? <div className='text-center bg-green-900 my-2 h-8 w-64 md:w-80 rounded-md cursor-progress flex justify-center items-center'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 text-white  my-2 h-8 w-64 md:w-80 rounded-md cursor-pointer' type="submit" value="Get Reset Password Link" />
                        }


                    </form>
                    <div className='text-center'>
                        <Link className='text-gray-200 text-sm my-4 ' href={'/login'} >click here for <span className=' underline decoration-2 decoration-green-200'>SignIn</span></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ForgetPasswordPage;