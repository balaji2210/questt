import { QueryClient, useMutation } from "@tanstack/react-query";
import { postApi } from "./utils/postApi";

const queryClient = new QueryClient();

const deleteBook = async (data) => {
  const response = await postApi(`author/delete-book`, data);
  return response;
};

export default function useDeleteBook() {
  return useMutation((data) => deleteBook(data), {
    onSuccess: () => {
      queryClient?.invalidateQueries("getAuthorBooks");
    },
  });
}
