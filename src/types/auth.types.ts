export type DecodedUser = {
    id: string;
    contact: string;
    role: 'customer' | 'mealProvider'; // add more roles if needed
    iat: number; // issued at (timestamp)
    exp: number; // expiry (timestamp)
};