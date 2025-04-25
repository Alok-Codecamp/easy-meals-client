"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClockLoader } from "react-spinners";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { DecodedUser } from "@/types/auth.types";
import { toast } from "sonner";
import { useUpdateMealMutation } from "@/redux/features/meals/mealApi";
import { Checkbox } from "@/components/ui/checkbox";
import { mealCategories, mealIngredients, mealPortions, mealTags } from "@/app/(dashboard)/dashboard/provider/create-meal/constant";
import { useGetMyMealProviderQuery } from "@/redux/features/mealProviders/mealProvidersApi";
import { useGetMealByIdQuery } from "@/redux/features/meals/mealApi";
import { updateMealSchema } from "./updateMealvalidationSchema";
import { useEffect, } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";


type TMeal = z.infer<typeof updateMealSchema>;
const SelectedMealUpdatePage = () => {
    const params = useParams();
    const { mealId } = params;
    const currentUser = useAppSelector(selectCurrentUser) as DecodedUser;
    const { data: providerData } = useGetMyMealProviderQuery(currentUser?.id);
    const { data: mealRespone, isLoading } = useGetMealByIdQuery(mealId)
    const [updateMeal] = useUpdateMealMutation();
    const meal = mealRespone?.data;
    console.log(meal);


    const form = useForm<TMeal>({
        resolver: zodResolver(updateMealSchema),
        defaultValues: {
            title: meal?.title || "Hello meal title",
            description: meal?.description || "",
            price: meal?.price || "",
            image: meal?.image || "",
            preparationTime: meal?.preparationTime || "",
            category: meal?.category || [""],
            tags: meal?.tags || [""],
            ingredients: meal?.ingredients || [""],
            portion: meal?.portion || [""],
            isAvailable: meal?.isAvailable || "Yes"
        },
    });

    useEffect(() => {
        form.reset({
            title: meal?.title,
            description: meal?.description,
            price: meal?.price,
            image: meal?.image,
            preparationTime: meal?.preparationTime,
            category: meal?.category,
            tags: meal?.tags,
            ingredients: meal?.ingredients,
            portion: meal?.portion,
            isAvailable: meal?.isAvailable,
        })
    }, [meal, form])
    const onSubmit: SubmitHandler<TMeal> = async (data) => {
        const filteredObject = Object.fromEntries(Object.entries(data).filter(([, value]) => {
            if (typeof value === 'boolean') {
                return true
            }
            if (typeof value === 'number') {
                return true;
            }
            if (typeof value === 'string') {
                return value.trim() !== ''
            }
            return false;
        }))
        filteredObject.providerId = providerData?.data[0]?._id

        console.log(filteredObject);

        const toastId = toast.loading("Meal  creating...");
        try {
            const resposneData = await updateMeal({ data: filteredObject, id: meal?._id });
            if (resposneData) {
                console.log(resposneData);
                toast.success("Meal  created successfully", { id: toastId });
                form.reset();
            } else {
                toast.error((resposneData as any)?.error?.data?.message, { id: toastId });
            }
        } catch (err: any) {

            toast.error(err.message || "faild to create meal ", { id: toastId });
        }
    };
    return (
        <div>
            {
                isLoading ? <p>Loading data....</p> :
                    <div className="mx-20 py-4">
                        <h1 className="text-green-800 text-3xl mb-10 font-bold">
                            Create Meal That&apos;s you wnat to offer our customer
                        </h1>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="border-2 border-gray-400" />
                                                </FormControl>
                                                <FormDescription>
                                                    Your meal title
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value}
                                                            className="border-2 border-gray-400"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Tell customers what makes this meal special. Mention
                                                        flavors, ingredients, or cooking style.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value}
                                                            className="border-2 border-gray-400"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Mention your meal price</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meal Image Url</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value}
                                                            className="border-2 border-gray-400"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>Provide your meal Image URl</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="preparationTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Preperation time</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value}
                                                            className="border-2 border-gray-400"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>How meny time to take prepeare the meal</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-base">Meal Category</FormLabel>
                                                        <FormDescription>
                                                            Select Categories of your meal
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400  px-4 py-4 rounded-md">
                                                        {mealCategories.map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="category"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox className="border-2 border-gray-400"
                                                                                    checked={(field.value || []).includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value || [], item.id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item.label}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
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
                                                        <FormLabel className="text-base">Meal Tags</FormLabel>
                                                        <FormDescription>
                                                            Select Tags of your meal
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400  px-4 py-4 rounded-md">
                                                        {mealTags.map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="tags"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox className="border-2 border-gray-400"
                                                                                    checked={field.value?.includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value || [], item.id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />

                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item.label}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
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
                                    <div >
                                        <FormField
                                            control={form.control}
                                            name="portion"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-base">Meal Portions</FormLabel>
                                                        <FormDescription>
                                                            Select portions of your meal
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400  px-4 py-4 rounded-md">
                                                        {mealPortions.map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="portion"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox className="border-2 border-gray-400"
                                                                                    checked={field.value?.includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value || [], item.id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item.label}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
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
                                                        <FormLabel className="text-base">Meal Ingredients</FormLabel>
                                                        <FormDescription>
                                                            Select ingredients of your meal
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 md:border-2 border-gray-400 px-4 py-4 rounded-md">
                                                        {mealIngredients.map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="ingredients"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox className="border-2 border-gray-400"
                                                                                    checked={field.value?.includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value || [], item.id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {item.label}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
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
                                            name="isAvailable"
                                            render={({ field }) => (
                                                <FormItem >
                                                    <FormLabel>Availability</FormLabel>
                                                    <Select value={field.value || meal && meal?.isAvailable} onValueChange={field.onChange} >
                                                        <FormControl>
                                                            <SelectTrigger className="border-2 border-gray-400">
                                                                <SelectValue placeholder={`your current value is ${meal && meal?.isAvailable}`} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent >
                                                            <SelectItem value="Yes">Yes</SelectItem>
                                                            <SelectItem value="No">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription>
                                                        Set your meal as available or not
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <Button type="submit" className="cursor-pointer">
                                        {isLoading ? <ClockLoader /> : "Create Meal"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
            }
        </div>
    );
}

export default SelectedMealUpdatePage;
