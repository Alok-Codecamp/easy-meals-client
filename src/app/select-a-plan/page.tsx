"use client"

import NavBar from "@/components/shared/NavBar"
import { SubmitHandler, useForm } from "react-hook-form";
import cleanMeal from '@/assets/selectMeals/clean-meal.png'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eagle_Lake } from "next/font/google";
type TFormValue = {
    meal: string;
    entries: string;
    mealPlan: 'my choice' | "chef's choice"

}
const SelectPlanPage = () => {
    const [selectedMealPlan, setSelectedMealPlan] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<TFormValue>();
    const currentMealPlan = watch('mealPlan')
    useEffect(() => {
        setSelectedMealPlan(currentMealPlan);
    }, [currentMealPlan]);
    console.log(selectedMealPlan);

    const onSubmit: SubmitHandler<TFormValue> = (data) => {
        console.log(data);
    }


    return (
        <div>
            <NavBar />
            <header className="mx-16">
                <p className="mt-8 ml-16">What Kind Of Meals Do You Prefer?</p>
                <h1 className="text-4xl font-bold text-gray-800 ml-16">Select A Profile</h1>
            </header>

            <div className="mx-4">
                <form onSubmit={handleSubmit(onSubmit)} className="text-center mb-20">
                    <div className="md:flex justify-center items-baseline space-x-12">
                        <section className="grid grid-cols-2 gap-2.5">

                            <label className="relative cursor-pointer group">
                                <input {...register('meal')} type="radio" className="peer hidden" value="clean-meal-1" />
                                <Image src={cleanMeal} alt="Meal 1" className=" object-cover rounded-lg border-4 border-transparent peer-checked:border-green-800 transition" width={250} height={150} />

                            </label>
                            <label className="relative cursor-pointer group">
                                <input {...register('meal')} type="radio" className="peer hidden" value="clean-meal-1" />
                                <Image src={cleanMeal} alt="Meal 1" className=" object-cover rounded-lg border-4 border-transparent peer-checked:border-green-800 transition" width={250} height={150} />

                            </label>
                            <label className="relative cursor-pointer group">
                                <input {...register('meal')} type="radio" className="peer hidden" value="clean-meal-1" />
                                <Image src={cleanMeal} alt="Meal 1" className=" object-cover rounded-lg border-4 border-transparent peer-checked:border-green-800 transition" width={250} height={150} />

                            </label>
                            <label className="relative cursor-pointer group">
                                <input {...register('meal')} type="radio" className="peer hidden" value="clean-meal-1" />
                                <Image src={cleanMeal} alt="Meal 1" className=" object-cover rounded-lg border-4 border-transparent peer-checked:border-green-800 transition" width={250} height={150} />

                            </label>
                            <label className="relative cursor-pointer group">
                                <input {...register('meal')} type="radio" className="peer hidden" value="clean-meal-1" />
                                <Image src={cleanMeal} alt="Meal 1" className=" object-cover rounded-lg border-4 border-transparent peer-checked:border-green-800 transition" width={250} height={150} />

                            </label>
                            <label className="relative cursor-pointer group">
                                <input {...register('meal')} type="radio" className="peer hidden" value="clean-meal-1" />
                                <Image src={cleanMeal} alt="Meal 1" className=" object-cover rounded-lg border-4 border-transparent peer-checked:border-green-800 transition" width={250} height={150} />

                            </label>


                        </section>

                        <section>
                            <p className="text-xl text-gray-800 my-4 text-left">How many entrées per delivery?</p>
                            <div className="flex gap-4">
                                {[7, 10, 14].map((entry) => (
                                    <label key={entry} className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            value={entry}
                                            {...register('entries')}
                                            className="peer hidden"
                                        />
                                        <div className="w-20 h-10 flex items-center justify-center rounded-lg border border-gray-400 peer-checked:border-2 peer-checked:border-green-600 peer-checked:bg-green-50 transition">
                                            <span className="text-lg font-medium text-gray-700">{entry}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="my-2 text-left">
                                <p className="text-xl text-gray-800">What type of meal plan would you prefer?</p>
                                <p>Choose your meals, or let our Chefs rotate your meals.?</p>
                            </div>
                            <div className="flex gap-4">
                                {["My Choice", "Chef's Choice"].map((meal) => (
                                    <label key={meal} className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            value={meal}
                                            {...register('mealPlan')}
                                            className="peer hidden"
                                        />
                                        <div className="w-fit h-10 px-4 flex items-center justify-center rounded-lg border border-gray-400 peer-checked:border-2 peer-checked:border-green-600 peer-checked:bg-green-50 transition">
                                            <span className="text-lg font-medium text-gray-700">{meal}</span>
                                        </div>
                                    </label>
                                ))}
                                {
                                    selectedMealPlan == "Chef's Choice" ? <p className="text-2xl">
                                        working
                                    </p> : <p>not working</p>
                                }
                            </div>

                            <div className="text-left my-8">
                                <input type="submit" value="NEXT" className="w-60 md:w-80 bg-green-900 h-10 text-white rounded-lg" />
                            </div>
                        </section>
                    </div>
                    <br />


                </form>

            </div>
        </div>
    )
}

export default SelectPlanPage;