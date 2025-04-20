"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { DecodedUser } from "@/types/auth.types";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ClockLoader } from "react-spinners";
import { useCreateMealProviderMutation, useGetMyMealsQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import { Plus } from "lucide-react";
import { createProviderProfileformValidationSchema } from "./createProviderProfileVAlidation";


export type FormValue = z.infer<typeof createProviderProfileformValidationSchema>;

const CreateProviderProfilePage = () => {

    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const [createProviderProfile, { error }] = useCreateMealProviderMutation()
    const { data: profileData, isLoading } = useGetMyProfileQuery(userInfo?.id);
    const providerUserInfo = profileData?.data;

    const form = useForm<FormValue>({
        resolver: zodResolver(createProviderProfileformValidationSchema),
        defaultValues: {
            cuisineSpecialties: [{ value: '' }],
            availability: [{ value: '' }],
            availableMealOptions: [{ value: '' }],
            pricing: { min: "", max: "" },
            experience: "",

        },
    });

    const { append: appendCuisineSpecialties, fields: cuisineSpecialtiesFields } = useFieldArray({
        control: form.control,
        name: "cuisineSpecialties",
    });

    const addCuisineSpecialties = () => {
        appendCuisineSpecialties({ value: "" });
    };
    const { append: appendAvailabilities, fields: availabilityFields } = useFieldArray({
        control: form.control,
        name: "availability",
    });

    const addAvailabilities = () => {
        appendAvailabilities({ value: "" });
    };
    const { append: appendavailableMealOptions, fields: availableMealOptionsFields } = useFieldArray({
        control: form.control,
        name: "availableMealOptions",
    });

    const addavailableMealOptions = () => {
        appendavailableMealOptions({ value: "" });
    };
    const onSubmit: SubmitHandler<FormValue> = async (data: any) => {
        data.mealProvider = providerUserInfo?._id;
        console.log(data);
        const toastId = toast.loading('profile data updating...')

        try {

            const resData = await createProviderProfile({ data, id: userInfo?.id }).unwrap()
            console.log(resData);

            toast.success('Profile created successfull', { id: toastId })

        } catch (err: any) {
            toast.error('something went wrong', { id: toastId })
        }
    };
    return (
        <div>
            {isLoading ? <p>Loading Data...</p> :
                <div className="shadow-md mx-10 px-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl text-green-800">Welcome {providerUserInfo?.name}! To get started, please complete your profile by providing the necessary information."</h1>

                        </div>
                        {/* <Image
                            src="https://i.ibb.co.com/hxkN5fkR/Abstract-Profile-Photo-Instagram-Post.jpg"
                            alt="profile image"
                            width={100}
                            height={100}
                            unoptimized
                        /> */}
                    </div>
                    <div className="py-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="text-center">
                                    {
                                        error && <p className="text-red-800 text-md">{(error as any)?.data?.message}</p>
                                    }
                                </div>
                                <div>
                                    <div>
                                        {cuisineSpecialtiesFields.map(
                                            (cuisineSpecialtiesField, index) => (
                                                <div id={cuisineSpecialtiesField?.id}>
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

                                {/* availability fields  */}
                                <div>
                                    <div>
                                        {availabilityFields.map(
                                            (availabilityField, index) => (
                                                <div id={availabilityField?.id}>
                                                    <FormField
                                                        control={form.control}
                                                        name={`availability.${index}.value`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>"When Are You Available? (Slot {index + 1})</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        value={field.value || ""}
                                                                        className=""
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center px-4 border-2 border-gray-100 hover:border-gray-400 rounded-md shadow-md my-2 cursor-pointer">
                                        <p> Add Another day</p>
                                        <Button onClick={addAvailabilities} variant={"outline"}>
                                            <Plus />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {availableMealOptionsFields.map(
                                            (availableMealOptionsField, index) => (
                                                <div id={availableMealOptionsField?.id}>
                                                    <FormField
                                                        control={form.control}
                                                        name={`availableMealOptions.${index}.value`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>"Available meal options({index + 1})</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        {...field}
                                                                        value={field.value || ""}
                                                                        className=""
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center px-4 border-2 border-gray-100 hover:border-gray-400 rounded-md shadow-md my-2 cursor-pointer">
                                        <p> Add more available Meal Options</p>
                                        <Button onClick={addavailableMealOptions} variant={"outline"}>
                                            <Plus />
                                        </Button>
                                    </div>
                                </div>
                                {/* experience field  */}
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Experience</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                    // value={field.value ||""}

                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                                <div className="text-center">
                                    <Button type="submit" disabled={isLoading} className="cursor-pointer">
                                        {isLoading ? (
                                            <ClockLoader color="#fff" size={24} />
                                        ) : (
                                            "Save Change"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            }
        </div>

    );
};

export default CreateProviderProfilePage;
