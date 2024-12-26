import { createSlice } from "@reduxjs/toolkit";

// initializing state to track if the user is authenticated or not
const initialState = {
    status : false,
    userData : null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        // login & logout are actions
        login : (state, action) => {
            state.status = true;   
            state.userData = action.payload;
            // console.log("user data after signin (Store) : ", state.userData);
        },

        logout : (state) => {
            state.status = false; 
            state.userData = null;
        }   
    }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;