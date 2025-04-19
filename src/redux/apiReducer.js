import { authImagekit } from "./services/authImagekit";
import { galleryApi } from "./services/galleryApi";
import { userApi } from "./services/userApi";

export const apiReducer = {
  [userApi.reducerPath]: userApi.reducer,
  [authImagekit.reducerPath]: authImagekit.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
};
