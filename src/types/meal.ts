export interface IMeal {
    _id: string;
    providerId?: string;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string[];
    tags: string[];
    ingredients: string[];
    preparationTime: string;
    portion: string[];
    isAvailable: boolean;
}
