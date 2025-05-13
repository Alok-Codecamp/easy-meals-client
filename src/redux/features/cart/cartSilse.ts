"use client"
import { RootState } from "@/redux/store";
import { IMeal } from "@/types/meal"
import { createSlice } from "@reduxjs/toolkit"


type TCartState = {

    meals: IMeal[];
    user: string | null;

}

const initialState: TCartState = {
    meals: [],
    user: "",
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {

            state.meals.push(action.payload.newCartItem);
            state.user = action.payload.user;

        },
        clearCart: (state) => {
            state.meals = [];
            state.user = "";


        },
    }
})

export const { addToCart } = cartSlice.actions;

export const getMyCart = (state: RootState) => state.cart.meals;

export default cartSlice.reducer;