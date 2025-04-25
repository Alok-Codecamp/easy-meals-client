"use client"
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

import { useAppSelector } from "@/redux/hooks";
import { DecodedUser } from "@/types/auth.types";
import {
    Card,
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

const ProviderDashboard = () => {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const { data: providerData } = useGetMyMealProviderQuery(userInfo?.id)
    const id = providerData?.data[0]?._id;
    console.log(id);
    const { data: mealData } = useGetAllMealQuery(id ? [{ name: 'providerId', value: id }] : skipToken)
    console.log(mealData);
    return (
        <div>
            <h1 className="text-3xl text-green-900 text-center font-bold mt-6 mb-10">Meals You Offered</h1>
            <div className="grid md:grid-cols-3 gap-4 px-6">

                {mealData?.data?.map((item: IMeal) => (
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
                            <Button className="w-12/12"><Link href={`/dashboard/provider/update-meal/${item?._id}`}>View Details</Link></Button>
                        </CardFooter>
                    </Card>
                ))
                }


            </div>
        </div>
    )
};

export default ProviderDashboard;



