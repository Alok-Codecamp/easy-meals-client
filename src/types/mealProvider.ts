


export type TcustomerReview = {
    rating: number; review: string; reviewer: string;

}

export type TCuisineSpecialties = {
    value: string
}


export interface IMealProvider {
    _id: string;
    title: string;
    mealProvider: string;
    cuisineSpecialties: TCuisineSpecialties[];
    availableMealOptions: string[];
    availability: string[];
    pricing: { min: string; max: string };
    experience: string;

    customerReviews?: TcustomerReview[];
}
