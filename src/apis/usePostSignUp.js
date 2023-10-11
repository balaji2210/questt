import { useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const signUp = async (data) => {
  const response = await postApi(`auth/signup`, data);

  localStorage?.setItem("email", response?.data?.email);
  localStorage?.setItem("user_id", response?.data?._id);
  localStorage?.setItem("userType", response?.data?.userType);
  localStorage?.setItem("token", response?.data?.token);

  return response;
};

export default function usePostSignUp() {
  return useMutation((data) => signUp(data));
}
