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
import { SubmitErrorHandler, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClockLoader } from "react-spinners";
import { Plus } from "lucide-react";
import { mealProviderSchema } from "./createMealFormValidation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { DecodedUser } from "@/types/auth.types";
import { useCreateMealProviderMutation } from "@/redux/features/mealProviders/mealProvidersApi";
import { toast } from "sonner";

type TMealProvider = z.infer<typeof mealProviderSchema>;
const CreateMealPage = () => {
    const currentUser = useAppSelector(selectCurrentUser) as DecodedUser;
    const [createMealProvider, { isLoading }] = useCreateMealProviderMutation();
    const form = useForm<TMealProvider>({
        resolver: zodResolver(mealProviderSchema),
        defaultValues: {
            title: "",
            cuisineSpecialties: [{ value: " " }],
            availableMeals: [
                {
                    mealTitle: "",
                    description: "",
                    price: "",
                    image: ""
                },
            ],
            pricing: { min: "", max: "" },
            experience: "",
        },
    });

    const { append: appendAvailableMeals, fields: availableMealField } =
        useFieldArray({
            control: form.control,
            name: "availableMeals",
        });

    const addAvailableMeals = () => {
        appendAvailableMeals({ mealTitle: "", description: "", price: "", image: "" });
    };

    const { append: appendCuisineSpecialties, fields: cuisineSpecialtiesFields } =
        useFieldArray({
            control: form.control,
            name: "cuisineSpecialties",
        });

    const addCuisineSpecialties = () => {
        appendCuisineSpecialties({ value: "" });
    };

    const onSubmit: SubmitHandler<TMealProvider> = async (data: any) => {
        console.log(data);
        const providerDdata = { data, id: currentUser?.id };
        const toastId = toast.loading("Meal provider creating...");
        try {
            const resposneData = await createMealProvider(providerDdata);
            if (resposneData.data) {
                toast.success("Meal provider created successfully", { id: toastId });
            }
        } catch (err: any) {
            toast.error("faild to create meal provider", { id: toastId });
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
                                        <Input {...field} value={field.value || " "} className="" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <div>
                                {cuisineSpecialtiesFields.map(
                                    (cuisineSpecialtiesField, index) => (
                                        <div id={cuisineSpecialtiesField.id}>
                                            <FormField
                                                control={form.control}
                                                name={`cuisineSpecialties.${index}.value`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>cuisineSpecialtie{index + 1}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                value={field.value || ""}
                                                                className=""
                                                            />
                                                        </FormControl>
                                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                            <div className="flex justify-between items-center px-4 border-2 border-gray-100 hover:border-gray-400 rounded-md shadow-md my-2 cursor-pointer">
                                <p> Add more cuisineSpecialties</p>
                                <Button onClick={addCuisineSpecialties} variant={"outline"}>
                                    <Plus />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div>
                                {availableMealField.map((availabeMealField, index) => (
                                    <div id={availabeMealField.id}>
                                        <FormField
                                            control={form.control}
                                            name={`availableMeals.${index}.mealTitle`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meal title</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value || ""}
                                                            className=""
                                                        />
                                                    </FormControl>
                                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`availableMeals.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value || ""}
                                                            className=""
                                                        />
                                                    </FormControl>
                                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`availableMeals.${index}.price`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meal price</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value || ""}
                                                            className=""
                                                        />
                                                    </FormControl>
                                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`availableMeals.${index}.image`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meal Photo Url</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            value={field.value || ""}
                                                            className=""
                                                        />
                                                    </FormControl>
                                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center px-4 border-2 border-gray-100 hover:border-gray-400 rounded-md shadow-md my-2">
                                <p>Add more available meals</p>
                                <Button onClick={addAvailableMeals} variant="outline">
                                    <Plus />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name={"pricing.min"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Minimum Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || " "}
                                                className=""
                                            />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name={"pricing.max"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || " "}
                                                className=""
                                            />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="experience"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Experience</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || " "}
                                                className=""
                                            />
                                        </FormControl>
                                        {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="cursor-pointer">
                            {
                                isLoading ? <ClockLoader /> : "Create Meal"
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateMealPage;
