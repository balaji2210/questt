import { QueryClient, useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const queryClient = new QueryClient();

const updateBook = async (data) => {
  const response = await postApi(`author/update-book`, data);
  return response;
};

export default function useUpdateBook() {
  return useMutation((data) => updateBook(data), {
    onSuccess: () => {
      queryClient?.invalidateQueries("getAuthorBooks");
    },
  });
}
