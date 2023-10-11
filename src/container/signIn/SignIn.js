"use client";

import { Button, Card, Typography } from "@mui/material";
import styles from "./SignIn.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "components/utils";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import usePostSignIn from "apis/usePostSignIn";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "redux/features/userSlice";
import toast from "react-hot-toast";

const defaultValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignIn = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const { mutateAsync: signIn } = usePostSignIn();

  const handleData = async (data) => {
    const response = await signIn(data);

    if (redirect === "cart" && response?.success) {
      dispatch(
        login({
          user_id: response?.data?._id,
          email: response?.data?.email,
          userType: response?.data?.userType,
        })
      );
      router?.push(`/cart`);
    } else if (response?.success) {
      dispatch(
        login({
          user_id: response?.data?._id,
          email: response?.data?.email,
          userType: response?.data?.userType,
        })
      );
      toast?.success("Login Success");
      if (response?.data?.userType === "author") {
        router?.push(`/author/add-book`);
      } else {
        router?.push("/");
      }
    } else {
      toast?.error(response?.message);
    }
  };

  const handleAccount = () => {
    if (redirect === "cart") {
      router?.push(`/signup?redirect=cart`);
    } else router?.push(`/signup`);
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(handleData)}>
          <Card className={styles.formCard}>
            <Typography>SignIn</Typography>
            <TextField
              control={control}
              name="email"
              label="Email"
              type="email"
            />
            <TextField
              control={control}
              name="password"
              label="Password"
              type="password"
            />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography>Do not have account?</Typography>
              <Button onClick={handleAccount}>Signup</Button>
            </div>
            <Button variant="contained" type="submit">
              SignIn
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
