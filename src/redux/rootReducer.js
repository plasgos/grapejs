import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "./apiReducer";
import landingPageReducer from "./modules/landing-page/landingPageSlice";

export const rootReducer = combineReducers({
  ...apiReducer,
  landingPage: landingPageReducer,
});
