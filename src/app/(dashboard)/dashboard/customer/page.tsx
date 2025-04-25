"use client"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useGetAllMealQuery } from "@/redux/features/meals/mealApi";
import { IMeal } from "@/types/meal";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";


const CustomerPage = () => {
    // const [page, setPage] = useState(1);
    // const [limit, setLimit] = useState("10");
    // const [sort, setSort] = useState("-price");
    const [search, setSearch] = useState("");
    // const [minPrice, setMinPrice] = useState(1);
    // const [maxPrice, setMaxPrice] = useState(1000);
    // const [isAvailable, setIsAvailable] = useState(true);
    const queryArray = useMemo(() => {
        return [
            { name: "limit", value: 10 },
            { name: "page", value: 1 },
            { name: "search", value: search },

        ];
    }, [search]);

    const { data: mealData } = useGetAllMealQuery(queryArray)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    return (
        <div className="px-6">
            <h1 className="text-3xl text-green-900 text-center font-bold mt-6 mb-10">All Meals</h1>
            <div className="flex justify-between items-center space-x-4 mb-6 px-6">
                <div>
                    <Input onChange={handleSearch} placeholder="Search Meal" className="border-2 border-gray-400" />
                </div>
            </div>
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
                            <Button className=""><Link href={` `}>View Details</Link></Button>
                            <Button className=""><Link href={` `}>Order Now</Link></Button>
                        </CardFooter>
                    </Card>
                ))
                }


            </div>
        </div>
    );
}

export default CustomerPage;
