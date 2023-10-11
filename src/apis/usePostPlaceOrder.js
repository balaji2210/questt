import { useMutation } from "@tanstack/react-query";
import { postApi } from "./utils/postApi";

const placeOrder = async (data) => {
  const response = await postApi(`order/place`, data);
  return response;
};

export default function usePostPlaceOrder() {
  return useMutation((data) => placeOrder(data));
}
