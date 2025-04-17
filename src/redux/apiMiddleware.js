import { authImagekit } from "./services/authImagekit";
import { userApi } from "./services/userApi";

export const apiMiddleware = [userApi.middleware, authImagekit.middleware];
