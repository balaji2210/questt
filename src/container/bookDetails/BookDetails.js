"use client";

import useGetBookById from "apis/useGetBookById";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./BookDetails.module.css";
import Image from "next/image";
import { Button, Chip, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addItem } from "redux/features/cartSlice";

const BookDetails = () => {
  const searchParams = useSearchParams();

  const bookId = searchParams.get("bookId");

  const [bookDetails, setBookDetails] = useState({});

  const dispatch = useDispatch();

  const { data: bookApiData, status: bookApiStatus } = useGetBookById(bookId);

  const addToCart = () => {
    dispatch(
      addItem({
        title: bookDetails?.title,
        bookId: bookDetails?._id,
        count: 1,
        price: bookDetails?.price,
        image: bookDetails?.image?.url,
      })
    );
    toast?.success("Book Added To Cart");
  };

  useEffect(() => {
    if (bookApiStatus === "success") {
      setBookDetails(bookApiData?.data);
    }
  }, [bookApiData, bookApiStatus]);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <Image
            alt="book"
            src={bookDetails?.image?.url}
            width={350}
            height={350}
            priority
          />
        </div>
        <div className={styles.details}>
          <Typography variant="h6">Title: {bookDetails?.title}</Typography>
          <Typography variant="subtitle1">
            Description: {bookDetails?.description}
          </Typography>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Chip
              variant="filled"
              color="info"
              size="small"
              label={`₹ ${bookDetails?.price} `}
            />
            <Button
              disableElevation
              size="small"
              variant="contained"
              color="success"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
