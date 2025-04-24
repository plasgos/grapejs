import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditComponent: false,
  isFocusContent: "",
  googleFonts: [],
  sidebarWidth: undefined,
  isCollapsedSideBar: false,
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
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload;
    },
    setIsCollapsedSideBar: (state, action) => {
      state.isCollapsedSideBar = action.payload;
    },
  },
});

export const {
  setIsEditComponent,
  setIsFocusContent,
  setGoogleFont,
  setSidebarWidth,
  setIsCollapsedSideBar,
} = landingPageSlice.actions;

export default landingPageSlice.reducer;
