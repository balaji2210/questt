import { useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const signIn = async (data) => {
  const response = await postApi(`auth/signin`, data);

  localStorage?.setItem("email", response?.data?.email);
  localStorage?.setItem("user_id", response?.data?._id);
  localStorage?.setItem("userType", response?.data?.userType);
  localStorage?.setItem("token", response?.data?.token);

  return response;
};

export default function usePostSignIn() {
  return useMutation((data) => signIn(data));
}
