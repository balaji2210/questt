"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
      );

      if (!isAuthenticated) {
        router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
