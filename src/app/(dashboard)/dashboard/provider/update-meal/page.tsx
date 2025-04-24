"use client"
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import { useAppSelector } from "@/redux/hooks";
import { DecodedUser } from "@/types/auth.types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetMyMealProviderQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import { IMeal } from "@/types/meal";
import { useGetAllMealQuery } from "@/redux/features/meals/mealApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Item } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

const UpdateMealPage = () => {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const { data: providerData, } = useGetMyMealProviderQuery(userInfo?.id)
    const id = providerData?.data[0]?._id;
    console.log(id);
    const { data: mealData } = useGetAllMealQuery(id ? [{ name: 'providerId', value: id }] : skipToken)
    console.log(mealData);
    return (

        <div className="grid md:grid-cols-3 gap-4 px-6">

            {
                !mealData ? [1, 2, 3, 4, 5, 6].map((Item, index) => (<div key={index} className="flex flex-col space-y-3 ">
                    <Skeleton className="h-[225px] w-[250px] rounded-xl bg-gray-400" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-[250px] bg-gray-400" />
                        <Skeleton className="h-8 w-[200px] bg-gray-400" />
                    </div>
                </div>)) : mealData?.data?.map((item: IMeal, index: number) => (
                    <Card key={item?._id} className=" py-2 px-2">
                        <CardHeader>
                            <Image
                                src={item?.image}
                                alt="meal image"
                                width={0}
                                height={0}
                                unoptimized
                                priority
                                sizes="100vw"
                                className="rounded-md w-[320px]  h-auto"
                            />
                            <CardTitle className="my-2 text-green-900">{item?.title}</CardTitle>
                            <CardDescription className="text-md text-green-900">Price:{item?.price}</CardDescription>
                            <CardDescription className="text-md text-green-900">Category: {item?.category}</CardDescription>
                            <CardDescription className="text-md text-green-900">Prepear Time: {item?.preparationTime}</CardDescription>
                            <CardDescription className="text-md text-green-900">Is Available: {item.isAvailable ? 'Yes' : 'No'}</CardDescription>
                        </CardHeader>

                        <CardFooter className="mx-0 px-0 flex justify-between items-center">
                            <Button className=""><Link href={`/dashboard/provider/update-meal/${item?._id}`}>Update Meal</Link></Button>
                            <Button className="">Delete Meal</Button>
                        </CardFooter>
                    </Card>
                ))
            }


        </div>
    )
};

export default UpdateMealPage;



