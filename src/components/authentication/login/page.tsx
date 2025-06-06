"use client"
export const dynamic = 'force-dynamic';
import React, { useState } from 'react';
import styles from './login.module.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { selectCurrentUser, setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import verifyToken from '@/utils/verifyToken';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ClockLoader } from 'react-spinners'
import NavBar from '@/components/shared/NavBar';
import { loginValidationSchema } from './loginValidation';
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod';
// import { setCurrentUserInCoockies } from '@/services/auth/auth';
import { DecodedUser } from '@/types/auth.types';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { Button } from '@/components/ui/button';

type FormValue = z.infer<typeof loginValidationSchema>


const Login = () => {
    const [customeErrorState, setCustomErrorState] = useState('');
    const [login, { isError }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const userLogedin = useAppSelector(selectCurrentUser) as DecodedUser;

    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath")
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors, isSubmitting }
    } = useForm<FormValue>({ resolver: zodResolver(loginValidationSchema) });

    const handleAutoLogin = async (contact: string, password: string) => {
        setValue('contact', contact);
        setValue('password', password);
        const isValid = await trigger()
        if (isValid) {
            handleSubmit(onSumbimt)();
        }
    }
    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        const toastId = toast.loading('loging in...')
        try {

            const userData = await login(data);

            if (userData?.data) {
                const token = userData?.data?.data?.accessToken;
                const userInfo = verifyToken(token)
                dispatch(setUser({ user: userInfo, token: token }));
                // await setCurrentUserInCoockies(token)
                toast.success('Login successfully', { id: toastId });

                if (redirect) {
                    console.log('redirect');
                    router.push(redirect)
                }

                else {
                    router.push('/')
                }
            } else {
                setCustomErrorState((userData as any)?.error?.data?.message)
                toast.error(`login faild `, { id: toastId })
            }
        } catch (err: any) {

            toast.error(err.message || 'Something went wrong', { id: toastId });
        }
    }
    console.log(customeErrorState);

    return (
        <div>
            <NavBar />
            <div className={`${styles.loginPageContainer}  flex justify-between items-center space-x-8 h-screen `}>

                <div className=' bg-white/90 shadow-lg w-fit h-fit px-10 py-6 text-green-800 mx-auto rounded-md'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Sign In</h1>
                    <div className='md:flex justify-center items-center space-x-2 my-2'>
                        <Button onClick={() => handleAutoLogin('alok61.bd@gmail.com', '112233')}>Provider Credentials</Button>
                        <Button onClick={() => handleAutoLogin('alokdas1dd@gmail.com', '112233')}>Customer Cridentials</Button>
                    </div>
                    {
                        isError ? <p className="text-red-800 text-sm text-center my-2">{customeErrorState}!</p> : <></>
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
                            isSubmitting ? <div className='text-center bg-green-900 my-2 h-8 w-64 md:w-80 rounded-md cursor-progress flex justify-center items-center'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 w-64 md:w-80 py-1 rounded-md cursor-pointer text-white' type="submit" value="Sign In" disabled={userLogedin ? true : false} />
                        }


                    </form>
                    <div className='text-left text-green-800'>
                        <p className='text-sm my-4 '>Don&apos;t have an account <Link className=' underline decoration-2 decoration-green-800' href={'/register'}>signup</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
