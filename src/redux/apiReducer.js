import { userApi } from "./services/userApi";

export const apiReducer = {
  [userApi.reducerPath]: userApi.reducer,
};
