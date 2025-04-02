"use server"

import { json } from "stream/consumers";


type LoginData = {
    contact: string;
    password: string;
}

const loginUser = async (data: LoginData) => {
    const res = await fetch('https://easy-meals-server.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });
    const token = await res.json();
    return token;
}

export default loginUser;