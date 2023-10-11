"use client";

import useGetAuthorBooks from "apis/useGetAuthorBooks";
import styles from "./MyBooks.module.css";
import MyBookCard from "components/myBookCard/MyBookCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "components/utils";
import useDeleteBook from "apis/useDeleteBook";
import toast from "react-hot-toast";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MyBooks = () => {
  const router = useRouter();

  const [books, setBooks] = useState([]);

  const { user } = useSelector((state) => state.user);

  const { data: authorBooksApiData, status: authorBooksApiStatus } =
    useGetAuthorBooks(user?.user_id);

  const { mutateAsync: deleteMyBook, isLoading } = useDeleteBook();

  const deleteBook = async (bookId = null) => {
    const { isConfirmed } = await Alert({
      text: "Are you sure you want to delete?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!isConfirmed) return;

    const response = await deleteMyBook({ bookId });

    if (response?.success) {
      toast?.success("Book Deleted Successfully!");
    } else {
      await Alert({
        title: "Error",
        text: response?.message,
        icon: "error",
      });
    }
  };

  const editBook = async (bookId = null) => {
    router?.push(`/author/add-book?bookId=${bookId}`);
  };

  useEffect(() => {
    if (authorBooksApiStatus === "success") {
      setBooks(authorBooksApiData?.data);
    }
  }, [authorBooksApiData, authorBooksApiStatus]);

  return (
    <div>
      <div className={styles.container}>
        {books?.length ? (
          books?.map((item) => (
            <MyBookCard
              key={item?._id}
              book={item}
              deleteBook={deleteBook}
              editBook={editBook}
            />
          ))
        ) : (
          <div>
            <Typography
              sx={{ textAlign: "center" }}
              color="#515A6F"
              variant="h6"
            >
              No Books Added Yet!
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
