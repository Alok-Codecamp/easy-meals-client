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
import { loginValidationSchema } from './loginValidation';
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod';
type FormValue = z.infer<typeof loginValidationSchema>


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
    } = useForm<FormValue>({ resolver: zodResolver(loginValidationSchema) });
    console.log(errors);
    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        const toastId = toast.loading('login processing...')
        try {

            const userData = await login(data);
            const token = userData?.data?.data?.accessToken
            const userInfo = verifyToken(token)
            console.log(userInfo);

            if (userInfo) {
                toast.success('Login successfully', { id: toastId })
                dispatch(setUser({ user: userInfo, token: token }))
            } else {
                console.log('hello');
                toast.error(`${errorMessage}`, { id: toastId })
            }

            router.push('/')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong', { id: toastId });
        }

    }


    return (
        <div>
            <NavBar />
            <div className={`${styles.loginPageContainer}  flex justify-between items-center space-x-8 h-screen `}>

                <div className=' bg-white/90 shadow-lg w-fit h-fit px-10 py-6 text-green-800 mx-auto rounded-md'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Sign In</h1>
                    {
                        isError ? <p className="text-red-800 text-sm text-center my-2">{errorMessage}!</p> : <></>
                    }

                    <form onSubmit={handleSubmit(onSumbimt)} >
                        <label htmlFor="contact" className='text-gray-700'>Email or Phone</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("contact")} id='contact' />
                        {errors.contact?.message && <p className='text-red-500 text-sm h-1'>{errors.contact?.message}</p>}
                        <br />
                        <label htmlFor="contact" className='text-gray-700'>Password</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("password")} />
                        {errors.password?.message && <p className='text-red-800 text-sm'>{errors.password?.message}</p>}
                        <div className='text-left my-2'>
                            <Link className='text-sm' href='/forgetPassword'>Forget Password?</Link>
                        </div>


                        {
                            isLoading ? <div className='text-center bg-green-900 my-2 h-8 w-64 md:w-80 rounded-md cursor-progress flex justify-center items-center'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 w-64 md:w-80 py-1 rounded-md cursor-pointer text-white' type="submit" value="Sign In" />
                        }


                    </form>
                    <div className='text-left text-green-800'>
                        <p className='text-sm my-4 '>Don't have an account <Link className=' underline decoration-2 decoration-green-800' href={'/register'}>signup</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
