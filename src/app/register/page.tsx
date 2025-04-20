"use client"
import NavBar from "@/components/shared/NavBar"
import styles from "./register.module.css"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


type FormValue = z.infer<typeof registerValidationSchema>;
const RegisterPage = () => {
    const [userRole, setUserRole] = useState('');
    const [signup, { isLoading, error, isSuccess, isError }] = useRegisterMutation();
    const errorMessage = error && (error as any)?.data?.message;

    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,

        handleSubmit,

        formState: { errors }
    } = useForm<FormValue>({
        resolver: zodResolver(registerValidationSchema)
    });


    const onSumbimt: SubmitHandler<FormValue> = async (data) => {

        const toastId = toast.loading('please wait...');
        const res = await signup(data);

        console.log(res);
        if (res?.data) {
            toast.success('registration successfull', { id: toastId })
            const userData = await login({ contact: data.email, password: data.password });
            const token = userData?.data?.data?.accessToken
            const userInfo = verifyToken(token)


            if (userInfo) {
                toast.success('registration successfull', { id: toastId })
                dispatch(setUser({ user: userInfo, token: token }))
                if (userInfo?.role === 'mealProvider') {
                    router.push('/profile/provider/create-profile')
                } else {
                    router.push('/profile/customer')
                }
            }


        } else {
            toast.error('registration faild', { id: toastId })
        }

    }
    return (
        <div>
            <NavBar />
            <div className={`${styles.registerPageContainer}  flex justify-between items-center space-x-8 `}>
                <div className=' bg-white/90 shadow-lg w-fit h-fit px-10 py-6 my-10 text-green-800 mx-auto rounded-md text-center'>
                    <h1 className='text-center text-2xl mx-2 my-4'>Sign Up</h1>
                    <p className="text-left h-1 mb-16">Let's start a awsome journey with Easy Meals</p>
                    {
                        isError ? <p className="text-red-800 text-sm text-center">{errorMessage}!</p> : <></>
                    }
                    <form onSubmit={handleSubmit(onSumbimt)} className="">
                        <div className="md:flex justify-center items-center space-x-2">
                            <div>
                                <label htmlFor="name">Name</label>
                                <br />
                                <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("name")} id="name" />
                                {errors.name?.message ? <p className='text-red-500 text-sm h-1 mb-3'>{errors.name?.message}</p> : <p className="text-red-500 text-sm h-1 mb-3"></p>}
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <br />
                                <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("email")} type="email" id="email" />
                                {errors.email?.message ? <p className='text-red-500 text-sm h-1 mb-3'>{errors.email?.message}</p> : <p className="text-red-500 text-sm h-1 mb-3"></p>}
                            </div>
                        </div>
                        <div>
                            <div className="md:flex justify-center items-center space-x-2">
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <br />
                                    <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("phone")} id="phone" />
                                    {errors.email?.message ? <p className='text-red-500 text-sm h-1 mb-3'>{errors.phone?.message}</p> : <p className="text-red-500 text-sm h-1 mb-3"></p>}
                                </div>

                                <div>
                                    <label htmlFor="password">Password</label>
                                    <br />
                                    <input className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-80 px-2'  {...register("password")} id="password" />
                                    {errors.password?.message ? <p className='text-red-500 text-sm h-1 mb-3'>{errors.password?.message}</p> : <p className="text-red-500 text-sm h-1 mb-3"></p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role">Select Your Role</label>
                            <br />
                            <select className='border-2 border-gray-400 rounded-md my-2 h-10 w-64 md:w-12/12 px-2'  {...register("role")} id="role">
                                <option value="">-- Please Choose --</option>
                                <option value="customer">Customer</option>
                                <option value="mealProvider">Meal Provider</option>
                            </select>

                            {errors.phone?.message && <p className='text-red-500 text-sm h-1 mb-3'>{errors.phone?.message}</p>}
                        </div>
                        <div className="flex justify-center items-center">
                            {
                                isLoading ? <div className='text-center bg-green-900 my-2 h-8 w-64 md:w-80 rounded-md cursor-progress flex justify-center items-center'><ClockLoader
                                    color='#d0d3d4' size={24} speedMultiplier={1.2} /></div> : <input className='bg-green-900 w-64 md:w-80 h-8 my-2 rounded-md cursor-pointer text-white' type="submit" value="Sign Up" />
                            }
                        </div>


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