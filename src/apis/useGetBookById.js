import { useQuery } from "@tanstack/react-query";

const { getApiNew } = require("./utils/getApi");

const getBookById = async (bookId = null) => {
  const response = await getApiNew(`book/details?bookId=${bookId}`);
  return response;
};

export default function useGetBookById(bookId) {
  return useQuery(["getBookById", bookId], () => getBookById(bookId), {
    enabled: !!bookId,
  });
}
