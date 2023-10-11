"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const Provider = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
