


export type TcustomerReview = {
    rating: number; review: string; reviewer: string;

}

export type TCuisineSpecialties = {
    value: string
}

export type IUser = {
    name: string;
    email: string;
    phone: string;
    password: string;
    emailVerified: boolean;
    shippingAddress?: string;
    profileImg?: string;
    role: "customer" | "mealProvider"
}
export interface IMealProvider {
    _id: string;
    title: string;
    mealProvider: IUser;
    cuisineSpecialties: TCuisineSpecialties[];
    availableMealOptions: string[];
    availability: string[];
    pricing: { min: string; max: string };
    experience: string;

    customerReviews?: TcustomerReview[];
}
