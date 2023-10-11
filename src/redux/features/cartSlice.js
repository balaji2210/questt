"use client";

import { createSlice } from "@reduxjs/toolkit";
import { removeDuplicates } from "helpers/cartHelper";

const initialState = {
  cart:
    typeof window !== "undefined" && localStorage?.getItem("cart")
      ? JSON?.parse(localStorage?.getItem("cart"))
      : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
      state.cart = removeDuplicates(state?.cart);
      typeof window !== "undefined" &&
        localStorage?.setItem("cart", JSON?.stringify(state?.cart));
    },
    removeItem: (state, action) => {
      state.cart = state?.cart?.filter(
        (item) => item?.bookId !== action?.payload?.bookId
      );
      typeof window !== "undefined" &&
        JSON?.stringify(localStorage?.setItem("cart", state?.cart || []));
    },
    removeAllItems: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, removeAllItems } = cartSlice.actions;

export default cartSlice.reducer;
