import { IMealProvider } from "./mealProvider";

interface RatedUser {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
}
interface RatingBreakdown {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
}

export interface IMeal {
    _id: string;
    providerId: IMealProvider;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string[];
    tags: string[];
    ingredients: string[];
    preparationTime: string;
    portion: string[];
    ratings: {

        average: number;
        count: number;
        breakdown: RatingBreakdown;
        lastRatedAt: Date;
        ratedUsers: RatedUser[];

    };
    isAvailable: boolean;
}
