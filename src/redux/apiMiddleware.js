import { userApi } from "./services/userApi";

export const apiMiddleware = [userApi.middleware];
