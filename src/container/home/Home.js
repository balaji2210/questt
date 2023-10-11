"use client";

import React, { useEffect, useState } from "react";
import HomeCard from "components/homeCard/HomeCard";
import styles from "./Home.module.css";
import useGetAllBooks from "apis/useGetAllBooks";

const Home = () => {
  const [books, setBooks] = useState([]);

  const { data: bookApiData, status: bookApiStatus } = useGetAllBooks();

  useEffect(() => {
    if (bookApiStatus === "success") {
      setBooks(bookApiData?.data);
    }
  }, [bookApiData, bookApiStatus]);

  return (
    <div className={styles.container}>
      {books?.map((item) => (
        <HomeCard key={item?._id} book={item} />
      ))}
    </div>
  );
};

export default Home;
