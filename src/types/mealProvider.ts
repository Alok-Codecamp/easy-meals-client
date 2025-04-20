

export type TMeal = {
    mealTitle: string;
    description: string;
    price: string;
    image: string;
    isAvailable: boolean;
}

export type TcustomerReview = {
    rating: number; review: string; reviewer: string;

}

export type TCuisineSpecialties = {
    value: string
}
export interface IMealProvider {
    mealProvider: string;
    title: string;
    cuisineSpecialties: TCuisineSpecialties[];
    availableMeals: TMeal[];
    pricing: { min: string; max: string };
    experience: string;
    customerReviews: TcustomerReview[];
}
