import { authImagekit } from "./services/authImagekit";
import { galleryApi } from "./services/galleryApi";
import { userApi } from "./services/userApi";

export const apiMiddleware = [
  userApi.middleware,
  authImagekit.middleware,
  galleryApi.middleware,
];
