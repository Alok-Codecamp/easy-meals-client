"use client"
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyMealsQuery } from "@/redux/features/mealProviders/mealProvidersApi";
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
import { z } from "zod";
import { mealProviderSchema } from "../create-meal/createMealFormValidation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type TmealProvider = z.infer<typeof mealProviderSchema>
const UpdateMealPage = () => {
    const userInfo = useAppSelector(selectCurrentUser) as DecodedUser;
    const { data: providerData, isLoading } = useGetMyMealsQuery(userInfo?.id);
    console.log(providerData);
    return (
        <div className="grid md:grid-cols-3 gap-4 px-6">
            {
                providerData?.data?.map((item: TmealProvider, index: number) => (
                    <Card id={String(index)} className=" py-2 px-2">
                        <CardHeader>
                            <Image src={item?.availableMeals[0]?.image} alt="meal image" width={0} height={0} unoptimized className="w-80 mx-auto rounded-md" />
                            <CardTitle className="my-2 text-green-900">{item?.title}</CardTitle>
                            <CardDescription className="text-md text-green-900">cuisineSpecialties:{item?.cuisineSpecialties?.map(citem => (`${citem?.value} ,`))}</CardDescription>
                            <CardDescription className="text-md text-green-900">Kitchen Experience:{item?.experience}</CardDescription>
                            <CardDescription className="text-md text-green-900">Pricing: ${item?.pricing?.min}-${item?.pricing?.max}</CardDescription>
                        </CardHeader>

                        <CardFooter className="mx-0 px-0 flex justify-between items-center">
                            <Button className="">Update Meals</Button>
                            <Button className=""><Link href="/profile/provider">Update Profile</Link></Button>
                        </CardFooter>
                    </Card>
                ))

            }

        </div>
    )
};

export default UpdateMealPage;
