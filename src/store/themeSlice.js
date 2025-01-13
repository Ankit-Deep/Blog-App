// Theme Changing Functionality
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  themeImg: "/public/icons8-sun-40.png",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightTheme: (state, action) => {
      state.theme = "light";
      state.themeImg = action.payload;
    },

    darkTheme: (state, action) => {
      state.theme = "dark";
      state.themeImg = action.payload;
    },
  },
});

export const { lightTheme, darkTheme } = themeSlice.actions;

export default themeSlice.reducer;
