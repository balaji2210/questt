"use client";
import CartCard from "components/cartCard/CartCard";
import styles from "./MyOrders.module.css";
import useGetOrders from "apis/useGetOrders";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const { user } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);

  const { data: orderApiData, status: orderApiStatus } = useGetOrders(
    user?.user_id
  );

  useEffect(() => {
    if (orderApiStatus === "success") {
      setOrders(orderApiData?.data);
    }
  }, [orderApiData, orderApiStatus]);

  return (
    <div>
      <div className={styles.container}>
        {orders?.length ? (
          <Typography sx={{ textAlign: "center" }} color="#515A6F" variant="h6">
            Your Orders
          </Typography>
        ) : null}
        {orders?.length ? (
          orders?.map((item) => <CartCard key={item?._id} cartItem={item} />)
        ) : (
          <Typography sx={{ textAlign: "center" }} color="#515A6F" variant="h6">
            No Books Order Yet
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
