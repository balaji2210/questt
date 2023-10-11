import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";

import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
