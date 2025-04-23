import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditComponent: false,
  isFocusContent: "",
  googleFonts: [],
};

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setIsEditComponent: (state, action) => {
      state.isEditComponent = action.payload;
    },
    setIsFocusContent: (state, action) => {
      state.isFocusContent = action.payload;
    },
    setGoogleFont: (state, action) => {
      state.googleFonts = action.payload;
    },
  },
});

export const { setIsEditComponent, setIsFocusContent, setGoogleFont } =
  landingPageSlice.actions;

export default landingPageSlice.reducer;
