
import NavBar from "@/components/shared/NavBar";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "About Us | Easy Meals",
        description: "Learn more about Easy Meals – your trusted platform for healthy, personalized meal plans. We connect customers with quality meal providers based on their preferences.",
        keywords: ["Easy Meals", "Meal Delivery", "Healthy Food", "Personalized Meal Plans", "Vegan", "Keto", "Gluten-Free"],
        openGraph: {
            title: "About Easy Meals",
            description: "Discover how Easy Meals helps customers and meal providers connect for better, healthier food experiences.",
            url: "https://easy-meals-silk.vercel.app/about",
            siteName: "Easy Meals",
            type: "website",
        },
    };
};

const AboutPage = () => {
    return (
        <div>
            <NavBar />
            <section className="max-w-4xl mx-auto py-12 px-6">
                <h1 className="text-4xl font-bold mb-4 text-center">About Easy Meals</h1>
                <p className="text-lg leading-relaxed text-gray-700">
                    At <strong>Easy Meals</strong>, we believe that access to healthy, delicious meals should be simple and flexible.
                    Our platform connects customers with experienced meal providers, allowing users to personalize their meal plans
                    based on dietary needs and taste preferences.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                    Whether you&apos;re following a vegan, keto, gluten-free, or other dietary lifestyle, Easy Meals is designed to help
                    you stay on track without sacrificing flavor or convenience.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                    For meal providers, our platform offers a seamless experience to manage orders, track deliveries, and build relationships
                    with customers who truly value nutritious, home-cooked meals.
                </p>
            </section>
        </div>
    );
};

export default AboutPage;
