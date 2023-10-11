"use client";

import MyOrders from "container/myOrders/MyOrders";
import withAuth from "helpers/withAuth";

const index = () => {
  return <MyOrders />;
};

export default withAuth(index);
