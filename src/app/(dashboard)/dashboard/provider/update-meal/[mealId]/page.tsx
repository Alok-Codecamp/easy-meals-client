"use client"

import { useGetMealByIdQuery } from "@/redux/features/meals/mealApi";


const SelectedMealUpdatePage = ({ params }: { params: { mealId: string } }) => {
    const { data: mealData, isLoading } = useGetMealByIdQuery(params.mealId)
    console.log(mealData);
    return (
        <div>
            {
                isLoading ? <p>Loading data....</p> : <div>

                </div>
            }
        </div>
    );
}

export default SelectedMealUpdatePage;
