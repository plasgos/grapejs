import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditComponent: false,
};

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setIsEditComponent: (state, action) => {
      state.isEditComponent = action.payload;
    },
  },
});

export const { setIsEditComponent } = landingPageSlice.actions;

export default landingPageSlice.reducer;
