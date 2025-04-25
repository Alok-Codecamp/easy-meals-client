"use client"
import OrderMeal from "@/components/orderPage/OrderMeal";
import NavBar from "@/components/shared/NavBar";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams();
    const mealId = params.mealId;
    return (
        <div className="text-center">
            <NavBar />
            <OrderMeal params={mealId as string} />
        </div>
    );
};

export default Page;
