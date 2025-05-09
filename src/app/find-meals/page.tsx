

import FindMeal from "@/components/findMeals/FindMeals"


//               
//                         
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