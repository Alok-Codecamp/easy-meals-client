"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { DecodedUser } from "@/types/auth.types";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
import { useGetMyMealsQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import { Plus } from "lucide-react";
import clsx from "clsx";

export type FormValue = z.infer<typeof providerProfileformValidationSchema>;

const ProviderProfilePage = () => {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const [updateUser, { isSuccess }] = useUpdateProfileMutation();
    const { data: profileData, isLoading } = useGetMyProfileQuery(userInfo?.id);
    const { data: mealProvider } = useGetMyMealsQuery(userInfo?.id);

    const myData = profileData?.data;
    console.log(mealProvider);

    const form = useForm<FormValue>({
        resolver: zodResolver(providerProfileformValidationSchema),
        defaultValues: {
            name: myData?.name,
            email: myData?.email,
            phone: myData?.phone,
            cuisineSpecialties: [{ value: mealProvider?.data[0]?.cuisineSpecialties[0]?.value }],
            pricing: { min: "", max: "" },
        },
    });
    React.useEffect(() => {
        if (myData) {
            form.reset({
                name: myData.name,
                email: myData.email,
                phone: myData.phone,
                cuisineSpecialties: mealProvider?.data[0]?.cuisineSpecialties?.map((item: any) => ({ value: item?.value })),
                pricing: {
                    min: mealProvider?.data[0]?.pricing.min || "",
                    max: mealProvider?.data[0]?.pricing.max || ""
                },

            });
        }
    }, [myData, mealProvider, form]);

    const { append: appendCuisineSpecialties, fields: cuisineSpecialtiesFields } = useFieldArray({
        control: form.control,
        name: "cuisineSpecialties",
    });

    const addCuisineSpecialties = () => {
        appendCuisineSpecialties({ value: "" });
    };
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
        <div>
            {
                !isSuccess && isLoading ? <p>Loading data...</p> : <div className="shadow-md mx-10 px-10">
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
                                <div>
                                    <div>
                                        {cuisineSpecialtiesFields.map(
                                            (cuisineSpecialtiesField, index) => (
                                                <div id={String(index)}>
                                                    <FormField
                                                        control={form.control}
                                                        name={`cuisineSpecialties.${index}.value`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>cuisineSpecialtie{index + 1}</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        value={field.value || ""}
                                                                        className=""
                                                                    />
                                                                </FormControl>
                                                                {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center px-4 border-2 border-gray-100 hover:border-gray-400 rounded-md shadow-md my-2 cursor-pointer">
                                        <p> Add more cuisineSpecialties</p>
                                        <Button onClick={addCuisineSpecialties} variant={"outline"}>
                                            <Plus />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"pricing.min"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Minimum Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value || " "}
                                                        className=""
                                                    />
                                                </FormControl>
                                                {/* <FormDescription>
                                                        This is your public display name.
                                                    </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"pricing.max"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Maximum Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value || " "}
                                                        className=""
                                                    />
                                                </FormControl>
                                                {/* <FormDescription>
                                                        This is your public display name.
                                                    </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
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
            }
        </div>

    );
};

export default ProviderProfilePage;
// {
//     isLoading ? <Button type="submit"><ClockLoader
//         color='#d0d3d4' size={24} speedMultiplier={1.2} /></Button> :
//         <Button className="cursor-pointer" type="submit">Save Change</Button>
// }