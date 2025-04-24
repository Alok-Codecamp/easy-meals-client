"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClockLoader } from "react-spinners";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { DecodedUser } from "@/types/auth.types";
import { toast } from "sonner";
import { useCreateMealMutation } from "@/redux/features/meals/mealApi";
import { mealSchema } from "./createMealFormValidation";
import { Checkbox } from "@/components/ui/checkbox";
import { mealCategories, mealIngredients, mealPortions, mealTags } from "./constant";
import { useGetMyMealProviderQuery } from "@/redux/features/mealProviders/mealProvidersApi";


type TMeal = z.infer<typeof mealSchema>;
const CreateMealPage = () => {
    const currentUser = useAppSelector(selectCurrentUser) as DecodedUser;
    const { data: providerData } = useGetMyMealProviderQuery(currentUser?.id);

    const [createMeal, { isLoading }] = useCreateMealMutation();
    const form = useForm<TMeal>({
        resolver: zodResolver(mealSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            image: "",
            preparationTime: "",
            category: [""],
            tags: [""],
            ingredients: [""],
            portion: [""],
        },
    });



    const onSubmit: SubmitHandler<TMeal> = async (data: any) => {
        data.providerId = providerData?.data[0]?._id


        const toastId = toast.loading("Meal  creating...");
        try {
            const resposneData = await createMeal(data);
            if (resposneData.data) {
                console.log(resposneData.data);
                toast.success("Meal  created successfully", { id: toastId });
                form.reset();
            } else {
                toast.error((resposneData as any)?.error?.data?.message, { id: toastId });
            }
        } catch (err: any) {
            toast.error("faild to create meal ", { id: toastId });
        }
    };
    return (
        <div className="mx-20 py-4">
            <h1 className="text-green-800 text-3xl mb-10 font-bold">
                Create Meal That's you wnat to offer our customer
            </h1>
            <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} className="" />
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
                                                className=""
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
                                                className=""
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
                                                className=""
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
                                                className=""
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
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
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
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
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
                                            <FormLabel className="text-base">Meal Portions</FormLabel>
                                            <FormDescription>
                                                Select portions of your meal
                                            </FormDescription>
                                        </div>
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
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
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
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
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
    );
};

export default CreateMealPage;
