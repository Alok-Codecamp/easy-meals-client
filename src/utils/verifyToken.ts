import { DecodedUser } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";



const verifyToken = (token: string) => {

    try {
        const decoded = jwtDecode(token);

        if (
            typeof decoded === 'object' &&
            'id' in decoded &&
            'contact' in decoded &&
            'role' in decoded &&
            'iat' in decoded &&
            'exp' in decoded
        ) {
            return decoded as DecodedUser;
        }

        return null;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export default verifyToken;