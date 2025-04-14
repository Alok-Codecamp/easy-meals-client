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
import { Contact } from "lucide-react";


type FormValue = {
    name: string;
    email: string;
    phone: string;
    password: string;
}
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
    } = useForm<FormValue>();

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
                <div className='backdrop-blur-md bg-white/20 w-fit h-fit px-6 py-6 text-white mx-auto rounded-sm'>
                    <h1 className='text-center text-2xl mt-2 mb-6'>Sign Up</h1>
                    {
                        isError ? <p className="text-white text-sm text-center">{errorMessage}!</p> : <></>
                    }
                    <form className=' text-center' onSubmit={handleSubmit(onSumbimt)}>
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("name")} placeholder='Full Name' />
                        <br />
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("email")} type="email" placeholder='Email' />
                        <br />
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("phone")} placeholder='Phone' />
                        <br />
                        <input className='border-1 border-white rounded-md my-2 h-8 md:w-64 px-2'  {...register("password")} placeholder='Password' />
                        <br />
                        {
                            isLoading ? <div className='bg-green-900 px-16 py-1 rounded-md cursor-progress w-fit mx-auto'><ClockLoader
                                color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 px-16 py-1 rounded-md cursor-pointer' type="submit" placeholder="Signup" />
                        }


                    </form>
                    <div className='text-center'>
                        <p className='text-gray-200 text-sm my-4 '>already have an account <Link className=' underline decoration-2 decoration-green-200' href={'/login'}>SignIn</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RegisterPage