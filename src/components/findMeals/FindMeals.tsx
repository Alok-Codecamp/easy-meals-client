"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useGetAllMealQuery } from "@/redux/features/meals/mealApi";
import { IMeal } from "@/types/meal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react"; // You can install lucide-react for icons
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IoIosArrowDown } from "react-icons/io";
import { useGetAllMealProviderQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import NavBar from "@/components/shared/NavBar";
import { IMealProvider } from "@/types/mealProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { addToCart, getMyCart } from "@/redux/features/cart/cartSilse";
import { DecodedUser } from "@/types/auth.types";







const FindMeal = () => {
    const [open, setOpen] = useState(false);
    // const [page, setPage] = useState(1);
    // const [limit, setLimit] = useState("10");
    // const [sort, setSort] = useState("-price");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [ratings, setRatings] = useState(1);
    const [tags, setTags] = useState<string[]>([]);
    const [providerId, setProviderId] = useState<string[]>([]);

    // const [isAvailable, setIsAvailable] = useState(true);
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const router = useRouter()
    const currentUser = useAppSelector(selectCurrentUser) as DecodedUser;
    const mycart = useAppSelector(getMyCart);

    const queryArray = useMemo(() => {
        return [
            { name: "limit", value: 10 },
            { name: "sort", value: '-price' },
            { name: "page", value: 1 },
            { name: "search", value: search },
            { name: "ratings.average", value: ratings },
            ...tags.map((item) => ({ name: "tags", value: item })),
            ...category.map((item) => ({ name: "category", value: item })),
            ...providerId.map((item) => ({ name: "providerId", value: item })),
        ];
    }, [tags, search, category, ratings, providerId]);

    const queryParam = searchParams.get('category');
    useEffect(() => {

        if (queryParam) {
            setSearch(queryParam)
            router.replace('/find-meals')
        }
    }, [queryParam, router])
    const { data: mealData, isLoading } = useGetAllMealQuery(queryArray);
    console.log(queryArray);
    console.log(mealData?.data[0]);
    // query for all provider 
    const { data: providerData } = useGetAllMealProviderQuery([])

    // handle tags item 
    const handleTagsChange = (value: string, checked: boolean) => {

        setTags((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value));

    };
    const handleProviderChange = (value: string, checked: boolean) => {
        setProviderId((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleCategoryChange = (value: string, checked: boolean) => {
        setCategory((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value))
    }
    const handleRatingsChange = (value: number, checked: boolean) => {
        setRatings(() => checked ? value : 0)
    }

    const handleReload = () => {
        router.refresh();
    }

    const handleAddCart = (item: IMeal) => {
        dispatch(addToCart({ newCartItem: item, user: currentUser?.id }))
        if (mycart.length >= 0) {

        }
    }
    return (
        <div className="">
            <NavBar />
            <div className="md:flex ">

                {/* Sidebar Toggle Button */}
                <div className="md:hidden p-4">
                    <Button onClick={() => setOpen(!open)} variant="outline">
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>

                </div>

                {/* Sidebar */}
                <div
                    className={`fixed  md:static top-20 left-0 h-full bg-white z-20 md:z-0 pt-4 w-64 pl-12 border-r border-gray-300 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0`}
                >

                    <div className="">

                        <h2 className="text-xl font-semibold mb-4">Select Your Preference</h2>
                        {/* testing  */}
                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center mb-2">Dietary Preferences<span className="ml-2"><IoIosArrowDown />
                            </span></CollapsibleTrigger>
                            <CollapsibleContent>

                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange("vegan", checked === true)} id="vegan" value='vegan' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="Vegan"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Vegan

                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('vegetarian', checked === true)} id="vegetarian" value='vegetarian' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="vegetarian"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Vegetarian
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('gluten-free', checked === true)} id="gluten-free" value='gluten-free' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="gluten-free"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Gluten-Free
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('keto', checked === true)} id="keto" value='keto' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="keto"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Keto
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('paleo', checked === true)} id="paleo" value='paleo' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="paleo"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Paleo
                                    </label>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        {/* testign  */}
                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center mb-2">Dietary Preferences<span className="ml-2"><IoIosArrowDown />
                            </span></CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange("vegan", checked === true)} id="vegan" value='vegan' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="Vegan"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Vegan
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('vegetarian', checked === true)} id="vegetarian" value='vegetarian' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="vegetarian"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Vegetarian
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('gluten-free', checked === true)} id="gluten-free" value='gluten-free' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="gluten-free"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Gluten-Free
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('keto', checked === true)} id="keto" value='keto' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="keto"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Keto
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleTagsChange('paleo', checked === true)} id="paleo" value='paleo' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="paleo"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Paleo
                                    </label>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    <div>

                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center mb-2">Meal Category<span className="ml-2"><IoIosArrowDown />
                            </span></CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleCategoryChange("breakfast", checked === true)} id="breakfast" value='breakfast' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="breakfast"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Breakfast
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleCategoryChange('lunch', checked === true)} id="lunch" value='lunch' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="lunch"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Lunch
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleCategoryChange('dinner', checked === true)} id="dinner" value='dinner' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="dinner"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dinner
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleCategoryChange('snacks', checked === true)} id="snacks" value='snacks' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="snacks"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Snacks
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleCategoryChange('dessert', checked === true)} id="dessert" value='dessert' className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="dessert"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dessert
                                    </label>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>

                    {/* filter meal by rattings  */}
                    <div>
                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center mb-2">Meal Ratings<span className="ml-2"><IoIosArrowDown />
                            </span></CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleRatingsChange(1, checked === true)} id="minimum-1" value={1} className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="minimum-1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Up to 1 star
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleRatingsChange(2, checked === true)} id="minimum-2" value={2} className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="minimum-2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Up to 2 stars
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleRatingsChange(3, checked === true)} id="minimum-3" value={3} className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="minimum-3"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Up to 3 stars
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleRatingsChange(4, checked === true)} id="minimum-4" value={4} className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="minimum-4"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Up to 4 stars
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2 my-3 ml-4">
                                    <Checkbox onCheckedChange={(checked) => handleRatingsChange(5, checked === true)} id="five" value={4} className="border-2 border-gray-400" />
                                    <label
                                        htmlFor="five"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        5 stars
                                    </label>
                                </div>

                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                    {/* filter by provider  */}
                    <div>
                        <Collapsible>
                            <CollapsibleTrigger className="flex items-center mb-2">Meal Providers<span className="ml-2"><IoIosArrowDown />
                            </span></CollapsibleTrigger>
                            <CollapsibleContent>
                                {
                                    providerData?.data?.map((item: IMealProvider) => (
                                        <div className="flex items-center space-x-2 my-3 ml-4" key={item._id}>
                                            <Checkbox onCheckedChange={(checked) => handleProviderChange(item._id, checked === true)} id={item.title} value={item._id} className="border-2 border-gray-400" />
                                            <label
                                                htmlFor={item.title}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {item.title}
                                            </label>
                                        </div>
                                    ))
                                }

                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </div>

                {/* Overlay (for mobile when sidebar is open) */}
                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
                    />
                )}

                {/* Main Content */}
                <div className="flex-1">
                    {isLoading ? <p>Loading meal data..</p> :
                        <div className="grid md:grid-cols-3 gap-4 px-8 py-4">
                            {
                                mealData?.data?.length === 0 ? <p>{search} meal not found!! <br /> please <span onClick={handleReload} className="text-green font-bold underline cursor-pointer">click here</span> for all meal</p> :
                                    mealData?.data?.map((item: IMeal, index: number) => (
                                        <Card key={index} className="py-2 px-2">
                                            <CardHeader>
                                                <Image
                                                    src={item?.image}
                                                    alt="meal image"
                                                    width={0}
                                                    height={0}
                                                    unoptimized
                                                    priority
                                                    sizes="100vw"
                                                    className="rounded-md w-[320px] h-auto"
                                                />
                                                <div className="flex justify-between items-center">
                                                    <p className="my-2 text-green-900 text-md font-bold">{item?.title}</p>
                                                    <p className="my-2 text-green-900 text-md font-bold flex justify-center items-center"><FaStar className="text-yellow-600" />{item?.ratings?.average}</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="my-1 text-green-900 flex justify-center items-center text-md"><IoPersonCircleSharp />{item?.providerId?.mealProvider?.name.split(' ')[0]}</p>
                                                    <div className="flex justify-center items-cente space-x-2">
                                                        <p className="my-1 text-green-900 text-md">${item?.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-cente">
                                                    <p className="my-1 text-green-900 text-md">Portion: {item?.portion[0]}</p>
                                                    <p className="my-1 text-green-900 text-md">Portion: {item?.tags[0]}</p>
                                                </div>
                                                <div className="flex justify-between items-center my-1">
                                                    <Link href={`/order-meal/${item._id}`}>
                                                        <Button className=""><TbListDetails />Details</Button>
                                                    </Link>

                                                    <Button onClick={() => handleAddCart(item)} className=""><FaCartShopping />Cart</Button>

                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FindMeal;
