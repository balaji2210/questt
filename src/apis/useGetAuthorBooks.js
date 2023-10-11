import { useQuery } from "@tanstack/react-query";
import { getApiNew } from "./utils/getApi";

const getAuthorBooks = async () => {
  const response = await getApiNew(`author/books`);
  return response;
};

export default function useGetAuthorBooks(userId) {
  return useQuery(["getAuthorBooks", userId], getAuthorBooks, {
    enabled: !!userId,
  });
}
