"use client";

import { Alert, TextField } from "components/utils";
import styles from "./AddBook.module.css";
import { useForm } from "react-hook-form";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import usePostAddBook from "apis/usePostAuthorAddBook";
import toast from "react-hot-toast";
import useGetBookById from "apis/useGetBookById";
import { useRouter, useSearchParams } from "next/navigation";
import useUpdateBook from "apis/usePostUpdateBook";

const defaultValues = {
  title: "",
  description: "",
  price: "",
};

const formSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().typeError("price is required field"),
});

const AddBook = () => {
  const [file, setFile] = useState(null);

  const searchParams = useSearchParams();

  const router = useRouter();

  const bookId = searchParams?.get("bookId");

  const { mutateAsync: addBook, isLoading } = usePostAddBook();

  const { mutateAsync: updateBook, isLoading: updateBookLoading } =
    useUpdateBook();

  const { data: bookApiData, status: bookApiStatus } = useGetBookById(bookId);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const handleData = async (data) => {
    const formData = new FormData();
    formData?.append("title", data?.title);
    formData?.append("description", data?.description);
    formData?.append("price", data?.price);

    if (!file && !bookId) {
      toast?.error("Please Select File");
      return;
    }

    if (file) {
      formData?.append("image", file);
    }
    let response = null;
    if (bookId) {
      formData?.append("bookId", bookId);

      const { isConfirmed } = await Alert({
        text: "Are you sure you want to update?",
        icon: "info",
        confirmButtonText: "Yes",
        showCancelButton: true,
      });
      if (!isConfirmed) return;

      response = await updateBook(formData);
    } else {
      response = await addBook(formData);
    }

    if (response?.success && bookId) {
      toast?.success("Book Updated");
    } else if (response?.success) {
      toast?.success("Book Added");
      router?.push(`/`);
      setFile(null);
      reset();
    } else {
      await Alert({
        title: "Error",
        text: response?.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (bookApiStatus === "success") {
      setValue("title", bookApiData?.data?.title);
      setValue("description", bookApiData?.data?.description);
      setValue("price", bookApiData?.data?.price);
    } else {
      reset();
    }
  }, [bookApiData, bookApiStatus]);

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(handleData)}>
          <div>
            <Typography
              sx={{ textAlign: "center" }}
              color="#515A6F"
              variant="h6"
            >
              {bookId ? "Update Book" : "Add Book"}
            </Typography>
          </div>
          <Card className={styles.formCard}>
            <TextField
              control={control}
              name="title"
              label="Title"
              type="text"
            />
            <TextField
              control={control}
              name="description"
              label="Description"
              multiline
              type="text"
              maxRows={4}
            />
            <TextField
              control={control}
              name="price"
              label="Price"
              type="number"
            />
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                width="150px"
                height="150px"
              />
            ) : (
              bookId && (
                <img
                  src={bookApiData?.data?.image?.url}
                  width="150px"
                  height="150px"
                />
              )
            )}
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadOutlinedIcon />}
            >
              Upload file
              <input
                hidden
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
            </Button>
            {bookId ? (
              <Button
                disabled={updateBookLoading}
                type="submit"
                variant="contained"
              >
                {updateBookLoading ? <CircularProgress /> : "Update Book"}
              </Button>
            ) : (
              <Button disabled={isLoading} type="submit" variant="contained">
                {isLoading ? <CircularProgress /> : "Add Book"}
              </Button>
            )}
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
