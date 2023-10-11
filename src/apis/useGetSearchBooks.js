import { useQuery } from "@tanstack/react-query";
import { getApiNew } from "./utils/getApi";

const searchBooks = async (data) => {
  const response = await getApiNew(`search?query=${data}`);
  return response;
};

export default function useGetSearchData(data) {
  return useQuery(
    ["searchBooks", data?.search, data?.id],
    () => searchBooks(data?.search),
    {
      enabled: !!data?.search,
      retry: 1,
    }
  );
}
