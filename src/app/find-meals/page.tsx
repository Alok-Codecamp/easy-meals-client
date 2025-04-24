// "use client"
// import { Button } from "@/components/ui/button";
// import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useGetAllMealQuery } from "@/redux/features/meals/mealApi";
// import { IMeal } from "@/types/meal";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useMemo, useState } from "react";
// import { ArrowDownNarrowWide, Menu, X } from "lucide-react"; // You can install lucide-react for icons
// import { Checkbox } from "@/components/ui/checkbox";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
// import { useGetAllMealProviderQuery } from "@/redux/features/mealProviders/mealProvidersApi";
// import NavBar from "@/components/shared/NavBar";
// import { IMealProvider } from "@/types/mealProvider";

import FindMeal from "@/components/findMeals/FindMeals"

// const FindMealPage = () => {
//     const [open, setOpen] = useState(false);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState("10");
//     const [sort, setSort] = useState("-price");
//     const [search, setSearch] = useState("");
//     const [category, setCategory] = useState<string[]>([]);
//     const [ratings, setRatings] = useState(1);
//     const [tags, setTags] = useState<string[]>([]);
//     const [providerId, setProviderId] = useState<string[]>([]);
//     const [isAvailable, setIsAvailable] = useState(true);

//     const queryArray = useMemo(() => {
//         return [
//             { name: "limit", value: limit },
//             { name: "sort", value: sort },
//             { name: "page", value: page },
//             { name: "search", value: search },
//             { name: "ratings", value: ratings },
//             ...tags.map((item) => ({ name: "tags", value: item })),
//             ...category.map((item) => ({ name: "category", value: item })),
//             ...providerId.map((item) => ({ name: "providerId", value: item })),
//         ];
//     }, [page, sort, limit, search, tags, category, ratings, providerId]);
//     console.log(queryArray);
//     const { data: mealData } = useGetAllMealQuery(queryArray);
//     // query for all provider 
//     const { data: providerData } = useGetAllMealProviderQuery([])
//     // handle search item   
//     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearch(e.target.value);
//     };

//     // handle tags item 
//     const handleTagsChange = (value: string, checked: boolean) => {
//         setTags((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value)
//         );
//     };
//     const handleProviderChange = (value: string, checked: boolean) => {
//         setProviderId((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value)
//         );
//     };

//     const handleCategoryChange = (value: string, checked: boolean) => {
//         setCategory((prev) => checked ? [...prev, value] : prev.filter((item) => item !== value))
//     }
//     const handleRatingsChange = (value: number, checked: boolean) => {
//         setRatings(() => checked ? value : 0)
//     }



//     return (
//         <div className="md:flex relative">

//             {/* Sidebar Toggle Button */}
//             <div className="md:hidden p-4">
//                 <Button onClick={() => setOpen(!open)} variant="outline">
//                     {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//                 </Button>

//             </div>

//             {/* Sidebar */}
//             <div
//                 className={`fixed md:static top-0 left-0 h-full bg-white z-20 w-64 p-4 border-r border-gray-300 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
//                     } md:translate-x-0`}
//             >

//                 <div className="mt-4">

//                     <h2 className="text-xl font-semibold mb-4">Select Your Preference</h2>
//                     <Collapsible>
//                         <CollapsibleTrigger className="flex items-center mb-2">Dietary Preferences<span className="ml-2"><IoIosArrowDown />
//                         </span></CollapsibleTrigger>
//                         <CollapsibleContent>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleTagsChange("vegan", checked === true)} id="vegan" value='vegan' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="Vegan"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Vegan
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleTagsChange('vegetarian', checked === true)} id="vegetarian" value='vegetarian' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="vegetarian"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Vegetarian
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleTagsChange('gluten-free', checked === true)} id="gluten-free" value='gluten-free' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="gluten-free"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Gluten-Free
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleTagsChange('keto', checked === true)} id="keto" value='keto' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="keto"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Keto
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleTagsChange('paleo', checked === true)} id="paleo" value='paleo' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="paleo"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Paleo
//                                 </label>
//                             </div>
//                         </CollapsibleContent>
//                     </Collapsible>
//                 </div>
//                 <div>

//                     <Collapsible>
//                         <CollapsibleTrigger className="flex items-center mb-2">Meal Category<span className="ml-2"><IoIosArrowDown />
//                         </span></CollapsibleTrigger>
//                         <CollapsibleContent>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleCategoryChange("breakfast", checked === true)} id="breakfast" value='breakfast' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="breakfast"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Breakfast
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleCategoryChange('lunch', checked === true)} id="lunch" value='lunch' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="lunch"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Lunch
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleCategoryChange('dinner', checked === true)} id="dinner" value='dinner' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="dinner"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Dinner
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleCategoryChange('snacks', checked === true)} id="snacks" value='snacks' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="snacks"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Snacks
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleCategoryChange('dessert', checked === true)} id="dessert" value='dessert' className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="paleo"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Dessert
//                                 </label>
//                             </div>
//                         </CollapsibleContent>
//                     </Collapsible>
//                 </div>

//                 {/* filter meal by rattings  */}
//                 <div>
//                     <Collapsible>
//                         <CollapsibleTrigger className="flex items-center mb-2">Meal Ratings<span className="ml-2"><IoIosArrowDown />
//                         </span></CollapsibleTrigger>
//                         <CollapsibleContent>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleRatingsChange(1, checked === true)} id="minimum-1" value={1} className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="minimum-1"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Up to 1 star
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleRatingsChange(2, checked === true)} id="minimum-2" value={2} className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="minimum-2"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Up to 2 stars
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleRatingsChange(3, checked === true)} id="minimum-3" value={3} className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="minimum-3"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Up to 3 stars
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleRatingsChange(4, checked === true)} id="minimum-4" value={4} className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="minimum-4"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     Up to 4 stars
//                                 </label>
//                             </div>
//                             <div className="flex items-center space-x-2 my-3 ml-4">
//                                 <Checkbox onCheckedChange={(checked) => handleRatingsChange(5, checked === true)} id="five" value={4} className="border-2 border-gray-400" />
//                                 <label
//                                     htmlFor="five"
//                                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                 >
//                                     5 stars
//                                 </label>
//                             </div>

//                         </CollapsibleContent>
//                     </Collapsible>
//                 </div>
//                 {/* filter by provider  */}
//                 <div>
//                     <Collapsible>
//                         <CollapsibleTrigger className="flex items-center mb-2">Meal Providers<span className="ml-2"><IoIosArrowDown />
//                         </span></CollapsibleTrigger>
//                         <CollapsibleContent>
//                             {
//                                 providerData?.data?.map((item: IMealProvider, index: number) => (
//                                     <div className="flex items-center space-x-2 my-3 ml-4" key={item._id}>
//                                         <Checkbox onCheckedChange={(checked) => handleProviderChange(item._id, checked === true)} id={`provider${index}`} value={item._id} className="border-2 border-gray-400" />
//                                         <label
//                                             htmlFor="minimum-1"
//                                             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                                         >
//                                             {item.title}
//                                         </label>
//                                     </div>
//                                 ))
//                             }

//                         </CollapsibleContent>
//                     </Collapsible>
//                 </div>
//             </div>

//             {/* Overlay (for mobile when sidebar is open) */}
//             {open && (
//                 <div
//                     onClick={() => setOpen(false)}
//                     className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
//                 />
//             )}

//             {/* Main Content */}
//             <div className="flex-1 px-6">
//                 <NavBar />
//                 <div className="h-10 shadow-md mb-4 px-6 flex">
//                     <Input
//                         onChange={handleSearch}
//                         placeholder="Search Meal"
//                         className="border-2 border-gray-400"
//                     />
//                     <IoIosSearch size={24} className="-ml-10 mt-2" />
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-4 px-6 py-10">
//                     {mealData?.data?.map((item: IMeal) => (
//                         <Card key={item?._id} className="py-2 px-2">
//                             <CardHeader>
//                                 <Image
//                                     src={item?.image}
//                                     alt="meal image"
//                                     width={0}
//                                     height={0}
//                                     unoptimized
//                                     priority
//                                     sizes="100vw"
//                                     className="rounded-md w-[320px] h-auto"
//                                 />
//                                 <CardTitle className="my-2 text-green-900">{item?.title}</CardTitle>
//                                 <CardDescription className="text-md text-green-900">Price: {item?.price}</CardDescription>
//                                 <CardDescription className="text-md text-green-900">Category: {item?.category}</CardDescription>
//                                 <CardDescription className="text-md text-green-900">Preparation Time: {item?.preparationTime}</CardDescription>
//                                 <CardDescription className="text-md text-green-900">Is Available: {item.isAvailable ? "Yes" : "No"}</CardDescription>
//                             </CardHeader>
//                             <CardFooter className="flex justify-between">
//                                 <Link href={`/view-meal-details/${item._id}`}>
//                                     <Button>View Details</Button>
//                                 </Link>
//                                 <Link href={`/order-meal/${item._id}`}>
//                                     <Button>Order Now</Button>
//                                 </Link>
//                             </CardFooter>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FindMealPage;
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "Find Meals | EasyMeals",
        description: "Discover your perfect meal based on preferences, ratings, and trusted providers. Filter by category, diet, and more with EasyMeals.",
        keywords: [
            "meals", "find meals", "easy meals", "meal search", "healthy meals",
            "meal categories", "vegan meals", "keto meals", "gluten-free meals",
            "meal provider", "order meals online", "meal ratings"
        ],
        openGraph: {
            title: "Find Meals | EasyMeals",
            description: "Browse and order meals tailored to your lifestyle. Filter by category, rating, provider, and dietary needs.",
            url: "https://yourdomain.com/find-meals", // replace with your real URL
            siteName: "EasyMeals",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
};


const FindMealPage = async () => {
    return (
        <>
            <FindMeal />
        </>
    )
}

export default FindMealPage;