import { useQuery } from "@tanstack/react-query";

import { getApiNew } from "./utils/getApi";

const getAllBooks = async () => {
  const response = await getApiNew(`book/all`);
  return response;
};

export default function useGetAllBooks() {
  return useQuery(["books"], getAllBooks);
}
