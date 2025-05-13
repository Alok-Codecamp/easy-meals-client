"use client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';

type FieldValue = {
    search: string
}
const SearchBar = () => {
    const router = useRouter();
    const form = useForm<FieldValue>();

    const onSubmit = (data: FieldValue) => {
        router.push(`/find-meals?category=${data.search}`)
    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center mx-4">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input className="w-xl h-12 placeholder:text-white text-white" placeholder="Search meal" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button variant={'default'} className="text-white bg-transparent -ml-10"><Search className="h-12 w-12" /></Button>
            </form>
        </Form>

    );
}

export default SearchBar;
