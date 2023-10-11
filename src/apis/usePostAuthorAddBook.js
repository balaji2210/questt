import { useMutation } from "@tanstack/react-query";

const { postApi } = require("./utils/postApi");

const authorAddBook = async (data) => {
  const response = await postApi(`author/add-book`, data);
  return response;
};

export default function usePostAddBook() {
  return useMutation((data) => authorAddBook(data));
}
