
import OrderMeal from "@/components/orderPage/OrderMeal";
import NavBar from "@/components/shared/NavBar";

type PageProps = {
    params: {
        mealId: string;
    };
};

const Page = async ({ params }: PageProps) => {
    const { mealId } = await params;

    return (
        <div className="text-center">
            <NavBar />
            <OrderMeal params={mealId} />
        </div>
    );
};

export default Page;
