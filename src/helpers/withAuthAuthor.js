"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const withAuthAuthor = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
      );
      const user = useSelector((state) => state.user.user);

      if (!isAuthenticated) {
        router.replace("/");
        return null;
      }

      if (user?.userType !== "author") {
        router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuthAuthor;
