"use server"

import { DecodedUser } from "@/types/auth.types";
import verifyToken from "@/utils/verifyToken";
import { cookies } from "next/headers";



type LoginData = {
    contact: string;
    password: string;
}

export const loginUser = async (data: LoginData) => {
    const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });
    const serverResponse = await res.json();
    if (serverResponse?.success) {
        const token = serverResponse.data.accessToken;
        (await cookies()).set('accessToken', token)
    }
    return serverResponse;
}


export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('refreshToken');
    if (tokenCookie?.value) {
        const decodedData = verifyToken(tokenCookie.value);
        return decodedData as DecodedUser;
    }

    return null;
}


export const deleteCoockies = async () => {
    (await cookies()).delete('refreshToken');
}




