"use client";
import { useGetMealByIdQuery } from "@/redux/features/meals/mealApi";
import { IMeal } from "@/types/meal";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ClockLoader } from "react-spinners";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { DecodedUser } from "@/types/auth.types";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";


interface FormValues {
    category: string[];
    tags: string[];
    ingredients: string[];
    portion: string[];
    schedule: string;
}
const OrderMeal = ({ params }: { params: string }) => {

    const { data: mealData, isLoading } = useGetMealByIdQuery(params);
    const customer = useAppSelector(selectCurrentUser) as DecodedUser;
    const [createOrder] = useCreateOrderMutation();
    const meal = mealData?.data;
    console.log(meal?.providerId?.availability);
    const [mealQuantity, setMealQuantity] = useState(1);
    const [mealPrice, setMealPrice] = useState(0);
    const form = useForm<FormValues>({
        defaultValues: {
            category: meal?.category || [""],
            tags: meal?.tags || [""],
            ingredients: meal?.ingredients || [""],
            portion: meal?.portion || [""],
            schedule: new Date().toISOString().slice(0, 16),
        },
    });
    useEffect(() => {
        form.reset({
            category: meal?.category,
            tags: meal?.tags,
            ingredients: meal?.ingredients,
            portion: meal?.portion,
            schedule: new Date().toISOString().slice(0, 16),
        });

    }, [meal]);
    useEffect(() => {
        if (meal?.price) {
            setMealPrice(Number(meal.price));
        }
    }, [meal]);
    const availableDays = meal?.providerId?.availability;
    const dayMap: Record<string, number> = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
    };
    const availableDayIndexes = availableDays?.map((day: string) => dayMap[day.toLowerCase()]);

    const handlePlus = () => {
        setMealQuantity(prev => {
            const newQuantity = prev + 1;
            setMealPrice(Number(meal?.price) * newQuantity);
            return newQuantity;
        });
    }
    const handleMinus = () => {
        setMealQuantity(prev => {
            const newQuantity = prev - 1;
            setMealPrice(Number(meal?.price) * newQuantity);
            return newQuantity;
        });
    }

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        data.totalPrice = mealPrice;
        data.quantity = mealQuantity;
        data.customerId = customer.id;
        data.mealId = meal._id;
        console.log(data);


        const toastId = toast.loading("Your order is processing...");
        try {
            const resposneData = await createOrder(data)
            if (resposneData) {
                console.log(resposneData);
                toast.success("order  created successfully", { id: toastId });
                form.reset();
            } else {
                toast.error((resposneData as any)?.error?.data?.message, { id: toastId });
            }
        } catch (err: any) {
            toast.error("faild to create meal ", { id: toastId });
        }
    };
    return (
        <div>
            {isLoading ? (
                <div className="w-fit mx-auto">
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[425px] w-[650px] rounded-xl bg-gray-400" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[250px] bg-gray-400" />
                            <Skeleton className="h-8 w-[200px] bg-gray-400" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="md:flex items-start justify-center px-4 my-10 md:space-x-16">
                    <div className="p-2 shadow-lg shadow-gray-400 rounded-md">
                        <Image
                            src={
                                meal?.image ||
                                "https://i.ibb.co.com/Y47nzS37/creamymashrooppasta.png"
                            }
                            alt="meal image"
                            width={600}
                            height={100}
                            unoptimized
                            priority
                            className="rounded-md"
                        />
                    </div>
                    <div className=" shadow-lg shadow-gray-400 rounded-md text-left my-6 md:my-0 p-6">
                        <div className="md:flex justify-between items-start">
                            <h1 className="text-gray-700 text-2xl font-bold ">{meal?.title}</h1>
                            <div>
                                <div className="mb-4">
                                    <p className="text-lg font-bold mb-4">price:${mealPrice}</p>
                                </div>
                                <div>
                                    <Button onClick={handleMinus} className="mx-2"><Minus /></Button>

                                    <span>{mealQuantity}</span>

                                    <Button onClick={handlePlus} className="mx-2"><Plus /></Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-base">
                                                            Meal Category
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select to Include category
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400  px-4 py-4 rounded-md">
                                                        {meal.category.map((item: string) => (
                                                            <FormField
                                                                key={item}
                                                                control={form.control}
                                                                name="category"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    className="border-2 border-gray-400"
                                                                                    checked={(field.value || []).includes(
                                                                                        item
                                                                                    )}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([
                                                                                                ...(field.value || []),
                                                                                                item,
                                                                                            ])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item
                                                                                                )
                                                                                            );
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {/* tags */}
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="tags"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-base">
                                                            Meal Tags
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select to include tags
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400  px-4 py-4 rounded-md">
                                                        {meal?.tags?.map((item: string) => (
                                                            <FormField
                                                                key={item}
                                                                control={form.control}
                                                                name="tags"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    className="border-2 border-gray-400"
                                                                                    checked={field.value?.includes(
                                                                                        item
                                                                                    )}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([
                                                                                                ...(field.value || []),
                                                                                                item,
                                                                                            ])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item
                                                                                                )
                                                                                            );
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {/* protion  */}
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="portion"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-base">
                                                            Meal Portions
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select portions of your meal
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400  px-4 py-4 rounded-md">
                                                        {meal?.portion?.map((item: string) => (
                                                            <FormField
                                                                key={item}
                                                                control={form.control}
                                                                name="portion"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    className="border-2 border-gray-400"
                                                                                    checked={field.value?.includes(
                                                                                        item
                                                                                    )}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([
                                                                                                ...(field.value || []),
                                                                                                item,
                                                                                            ])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item
                                                                                                )
                                                                                            );
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {/* ingredients */}
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="ingredients"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-base">
                                                            Meal Ingredients
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Select to include ingredients
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400 px-4 py-4 rounded-md">
                                                        {meal?.ingredients?.map((item: string) => (
                                                            <FormField
                                                                key={item}
                                                                control={form.control}
                                                                name="ingredients"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    className="border-2 border-gray-400"
                                                                                    checked={field.value?.includes(
                                                                                        item
                                                                                    )}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([
                                                                                                ...(field.value || []),
                                                                                                item,
                                                                                            ])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item
                                                                                                )
                                                                                            );
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="schedule"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-md">{meal?.providerId?.title} Only Available on this day: {meal?.providerId?.availability.join(", ")} </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[240px] pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value ? new Date(field.value) : undefined}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => !availableDayIndexes.includes(date.getDay())}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        Please Peack a date when {meal?.providerId?.title} is available
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="cursor-pointer">
                                        {form.formState.isSubmitting ? <ClockLoader /> : "Place Order"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderMeal;
