"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { DecodedUser } from "@/types/auth.types";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { providerProfileformValidationSchema } from "./formDataValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";

export type FormValue = z.infer<typeof providerProfileformValidationSchema>;

const ProviderProfilePage = () => {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const [updateUser, { isLoading }] = useUpdateProfileMutation();
    const { data: profileData, } = useGetMyProfileQuery(userInfo?.id);
    const myData = profileData?.data;
    console.log(profileData);

    const form = useForm<FormValue>({
        resolver: zodResolver(providerProfileformValidationSchema),
        defaultValues: {
            name: myData?.name,
            email: myData?.email,
            phone: myData?.phone,
        },
    });
    React.useEffect(() => {
        if (myData) {
            form.reset({
                name: myData.name,
                email: myData.email,
                phone: myData.phone,
            });
        }
    }, [myData, form]);
    const onSubmit: SubmitHandler<FormValue> = async (data: any) => {
        console.log(data);
        const toastId = toast.loading('profile data updating...')

        try {

            const resData = await updateUser({ data, id: userInfo?.id }).unwrap()
            console.log(resData);

            toast.success('Profile update successfull', { id: toastId })

        } catch (err: any) {
            toast.error('something went wrong', { id: toastId })
        }
    };
    return (
        <div className="shadow-md mx-10 px-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl">Edit Profile</h1>
                    <h1 className="text-3xl">{myData?.name}</h1>
                </div>
                <Image
                    src="https://i.ibb.co.com/hxkN5fkR/Abstract-Profile-Photo-Instagram-Post.jpg"
                    alt="profile image"
                    width={100}
                    height={100}
                    unoptimized
                />
            </div>
            <div className="py-10 text-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || " "} className="" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} className="" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ""} className="" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <ClockLoader color="#fff" size={24} />
                            ) : (
                                "Save Change"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ProviderProfilePage;
// {
//     isLoading ? <Button type="submit"><ClockLoader
//         color='#d0d3d4' size={24} speedMultiplier={1.2} /></Button> :
//         <Button className="cursor-pointer" type="submit">Save Change</Button>
// }