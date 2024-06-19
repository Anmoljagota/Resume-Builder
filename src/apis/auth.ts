import { baseApi } from "./axios";

export const signin = async (email: string, password: string) => {
  return await baseApi.post("/auth/signin", {
    email,
    password,
  });
};

export const logout = async () => {
  return await baseApi.get("/auth/signout");
};

export const me = async () => {
  return await baseApi.get("/auth/me");
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  return await baseApi.post("/auth/register", {
    email,
    password,
    name,
  });
};

export const getProfileImageUploadPolicy = async ({
  uploadType,
  extension,
}: {
  uploadType?: string;
  extension?: string;
}) => {
  return await baseApi.get("/profile/image/uploadPolicy", {
    params: { uploadType, extension },
  });
};
