import { authImagekit } from "./services/authImagekit";
import { userApi } from "./services/userApi";

export const apiReducer = {
  [userApi.reducerPath]: userApi.reducer,
  [authImagekit.reducerPath]: authImagekit.reducer,
};
