import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";



type TAuthState = {
    user: null | object;
    token: null | string;
}


const initialState: TAuthState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;

            if (token) {
                state.user = user;
                state.token = token;
            }
        },

        logOut: (state) => {
            state.user = null;
            state.token = null;

        }
    }
})

export const { setUser, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;