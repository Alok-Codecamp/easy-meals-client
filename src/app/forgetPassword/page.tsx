"use client"
import NavBar from "@/components/shared/NavBar"
import styles from "./forgetPassword.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";
import Link from "next/link";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";



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
    } = useForm<FormValue>();

    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        console.log(data);
        const toastId = toast.loading('please wait...');
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


    }
    return (
        <div>
            <NavBar />
            <div className={`${styles.registerPageContainer}  flex justify-between items-center space-x-8 h-screen `}>
                <div className='backdrop-blur-md bg-white/20 w-fit h-fit px-6 py-6 text-white mx-auto rounded-sm'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Forget Password</h1>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}!</p> : <p className="text-white text-sm text-left">{response}</p>
                    }
                    <form className=' text-center' onSubmit={handleSubmit(onSumbimt)}>

                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("email")} type="email" placeholder='Email' />
                        <br />


                        {
                            isLoading ? <div className='bg-green-900 px-10 py-1 my-2 rounded-md cursor-progress w-fit mx-auto'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 px-10 py-1 my-2 rounded-md cursor-pointer' type="submit" value="Get Reset Password Link" />
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