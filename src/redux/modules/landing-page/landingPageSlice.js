import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditComponent: false,
  isFocusContent: "",
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
  },
});

export const { setIsEditComponent, setIsFocusContent } =
  landingPageSlice.actions;

export default landingPageSlice.reducer;
