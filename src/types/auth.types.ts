export type DecodedUser = {
    id: string;
    name: string;
    contact: string;
    role: 'customer' | 'mealProvider'; // add more roles if needed
    iat: number; // issued at (timestamp)
    exp: number; // expiry (timestamp)
};