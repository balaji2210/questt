import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import userReducer from "./features/userSlice";

import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
