"use client";

import HomeCard from "components/homeCard/HomeCard";

import styles from "./Search.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGetSearchData from "apis/useGetSearchBooks";
import { v4 } from "uuid";
import { Typography } from "@mui/material";

const Search = () => {
  const router = useRouter();

  const searchParam = useSearchParams();

  const query = searchParam?.get("query");

  const [search, setSearch] = useState({});

  const [searchData, setSearchData] = useState([]);

  const {
    data: searchApiData,
    status: searchApiStatus,
    isLoading,
    fetchStatus,
  } = useGetSearchData(search);

  useEffect(() => {
    if (searchApiStatus === "success") {
      setSearchData(searchApiData?.data);
    }
  }, [searchApiData, searchApiStatus]);

  useEffect(() => {
    if (query) {
      setSearch({
        search: query,
        id: v4(),
      });
    } else {
      router?.push("/");
    }
  }, [query]);

  return (
    <div className={styles.container}>
      {searchData?.length ? (
        searchData?.map((item) => <HomeCard key={item?._id} book={item} />)
      ) : isLoading && fetchStatus !== "idle" ? (
        <Typography color="#515A6F" variant="h6">
          Loading ...
        </Typography>
      ) : (
        <Typography color="#515A6F" variant="h6">
          No Data Found
        </Typography>
      )}
    </div>
  );
};

export default Search;
