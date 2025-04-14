"use client"
import NavBar from "@/components/shared/NavBar"
import styles from "./register.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import z from 'zod';
import { registerValidationSchema } from "./registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";


type FormValue = z.infer<typeof registerValidationSchema>;
const RegisterPage = () => {
    const [signup, { isLoading, error, isSuccess, isError }] = useRegisterMutation();
    const errorMessage = error && (error as any)?.data?.message;

    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValue>({ resolver: zodResolver(registerValidationSchema) });

    const onSumbimt: SubmitHandler<FormValue> = async (data) => {
        const toastId = toast.loading('please wait...');
        const res = await signup(data);
        // toast.success('registration successfull', { id: toastId })
        console.log(res);
        if (res?.data) {

            const userData = await login({ contact: data.email, password: data.password });
            const token = userData?.data?.data?.accessToken
            const userInfo = verifyToken(token)
            console.log(userInfo);

            if (userInfo) {
                toast.success('registration successfull', { id: toastId })
                // toast.success('Login successfully', { id: toastId })
                dispatch(setUser({ user: userInfo, token: token }))
            }

            router.push('/')
        } else {
            toast.error('registration faild', { id: toastId })
        }

    }
    return (
        <div>
            <NavBar />
            <div className={`${styles.registerPageContainer}  flex justify-between items-center space-x-8 h-screen `}>
                <div className=' bg-white/90 shadow-lg w-fit h-fit px-10 py-6 text-green-800 mx-auto rounded-md'>
                    <h1 className='text-center text-2xl mx-2'>Sign Up</h1>
                    <p className="text-left h-1 mb-10">Let's start a awsome journey with Easy Meals</p>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}!</p> : <></>
                    }
                    <form onSubmit={handleSubmit(onSumbimt)}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("name")} id="name" />
                        {errors.name?.message && <p className='text-red-500 text-sm h-1'>{errors.name?.message}</p>}
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("email")} type="email" id="email" />
                        {errors.email?.message && <p className='text-red-500 text-sm h-1'>{errors.email?.message}</p>}
                        <br />
                        <label htmlFor="phone">Phone</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("phone")} id="phone" />
                        {errors.phone?.message && <p className='text-red-500 text-sm h-1'>{errors.phone?.message}</p>}
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("password")} id="password" />
                        {errors.password?.message && <p className='text-red-500 text-sm h-1'>{errors.password?.message}</p>}
                        <br />
                        {
                            isLoading ? <div className='text-center bg-green-900 my-2 h-8 w-64 md:w-80 rounded-md cursor-progress flex justify-center items-center'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 w-64 md:w-80 h-8 my-2 rounded-md cursor-pointer text-white' type="submit" value="Sign Up" />
                        }


                    </form>
                    <div className='text-center'>
                        <p className='text-green-800 text-sm my-4 '>already have an account <Link className=' underline decoration-2 decoration-green-800' href={'/login'}>SignIn</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RegisterPage