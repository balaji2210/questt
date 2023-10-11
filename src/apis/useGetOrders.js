import { useQuery } from "@tanstack/react-query";
import { getApiNew } from "./utils/getApi";

const getOrders = async () => {
  const response = await getApiNew(`order/all`);
  return response;
};

export default function useGetOrders(userId) {
  return useQuery(["getOrders", userId], getOrders, {
    enabled: !!userId,
  });
}
