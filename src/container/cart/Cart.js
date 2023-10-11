"use client";
import CartCard from "components/cartCard/CartCard";
import styles from "./Cart.module.css";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { getTotalPrice } from "helpers/cartHelper";

import { Alert } from "components/utils";
import { useRouter } from "next/navigation";
import usePostPlaceOrder from "apis/usePostPlaceOrder";
import { useDispatch, useSelector } from "react-redux";
import { removeAllItems, removeItem } from "redux/features/cartSlice";

const Cart = () => {
  const router = useRouter();

  const cart = useSelector((state) => state.cart.cart);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const { mutateAsync: placeOrder } = usePostPlaceOrder();

  const dispatch = useDispatch();

  const handleRemoveCartItem = (bookId) => {
    dispatch(removeItem({ bookId }));
  };

  const handleCheckout = async () => {
    if (!cart?.length) {
      const { isConfirmed } = await Alert({
        title: "Please Add Items to Checkout!",
        icon: "info",
        confirmButtonText: "Go To Home Page",
      });
      if (isConfirmed) {
        router?.push("/");
        return;
      }
    }
    if (typeof window !== "undefined") {
      if (!isAuthenticated) {
        await Alert({
          title: "Please Add Items to Checkout!",
          icon: "info",
          confirmButtonText: "SingIn",
        });
        router?.push(`/signin?redirect=cart`);
        return;
      }
    }
    const response = await placeOrder({ order: cart });
    if (response?.success) {
      await Alert({
        title: "Success",
        text: response?.message,
        icon: "success",
      });
      dispatch(removeAllItems());
      if (typeof window !== "undefined") {
        localStorage?.setItem("cart", JSON?.stringify([]));
      }
      router?.push("/myorders");
    } else {
      await Alert({
        title: "Error",
        text: response?.message,
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {cart?.length ? (
          cart?.map((item) => (
            <CartCard
              key={item?.bookId}
              cartItem={item}
              removeItem={handleRemoveCartItem}
            />
          ))
        ) : (
          <div>
            <Typography
              sx={{ textAlign: "center" }}
              color="#515A6F"
              variant="h6"
            >
              No Books In Cart
            </Typography>
          </div>
        )}
      </div>
      <div className={styles.priceCard}>
        <Typography color="#515A6F" variant="h6">
          Price Details
        </Typography>
        <div className={styles.priceDetails}>
          <div className={styles.items}>
            <Typography>Price ({cart?.length} item)</Typography>
            {` ₹ ${getTotalPrice(cart)}`}
          </div>
          <div className={styles.items}>
            <Typography>Total Amount </Typography>
            {` ₹ ${getTotalPrice(cart)}`}
          </div>
          <Button
            onClick={() => handleCheckout()}
            variant="contained"
            color="success"
            disabled={!cart?.length}
          >
            {!cart?.length ? "Add Items To Cart" : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
