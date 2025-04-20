"use client"
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllMealsQuery, useGetMyMealsQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import { IMealProvider } from "@/types/mealProvider";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";


const CustomerPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState("10");
    const [sort, setSort] = useState("-price");
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [isAvailable, setIsAvailable] = useState(true);
    const queryArray = useMemo(() => {
        return [
            // { name: "limit", value: limit },
            // { name: "sort", value: sort },
            // { name: "page", value: page },
            { name: "minPrice", value: minPrice },
            { name: "maxPrice", value: maxPrice },
            { name: "isAvailable", value: isAvailable },
            { name: "search", value: search },

        ];
    }, [page, sort, limit, minPrice, maxPrice, search, isAvailable]);

    const { data: mealData } = useGetAllMealsQuery(queryArray)
    console.log(mealData);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">

            {
                mealData?.data?.map((item: IMealProvider, index: number) => (

                    <Card id={String(index)} className=" py-2 px-2">
                        <CardHeader>
                            <Image src={item?.availableMeals[0]?.image} alt="meal image" width={0} height={0} unoptimized className="w-80 mx-auto rounded-md" />
                            <CardTitle className="my-2 text-green-900">{item?.title}</CardTitle>
                            <CardDescription className="text-md text-green-900">cuisineSpecialties:{item?.cuisineSpecialties?.map(citem => (`${citem?.value} ,`))}</CardDescription>
                            <CardDescription className="text-md text-green-900">Kitchen Experience:{item?.experience}</CardDescription>
                            <CardDescription className="text-md text-green-900">Pricing: ${item?.pricing?.min}-${item?.pricing?.max}</CardDescription>
                        </CardHeader>

                        <CardFooter className="mx-0 px-0 flex justify-between items-center">
                            <Button className="">View meals</Button>
                            <Button className=""><Link href="/profile/provider">Order now</Link></Button>
                        </CardFooter>
                    </Card>

                ))
            }

        </div>
    );
}

export default CustomerPage;
