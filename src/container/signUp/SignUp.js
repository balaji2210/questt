"use client";

import { Button, Card, Typography } from "@mui/material";
import styles from "./SignUp.module.css";
import { useForm } from "react-hook-form";
import { TextField } from "components/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import usePostSignUp from "apis/usePostSignUp";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "redux/features/userSlice";

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const SignUp = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const author = searchParams?.get("author");

  const redirect = searchParams?.get("redirect");

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const { mutateAsync: signUp } = usePostSignUp();

  const handleData = async (data) => {
    if (author) {
      data.userType = "author";
    }
    delete data.confirmPassword;

    const response = await signUp(data);

    if (response?.success) {
      dispatch(
        login({
          user_id: response?.data?._id,
          email: response?.data?.email,
          userType: response?.data?.userType,
        })
      );
      toast?.success("Registration Success");
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
      router?.push(`/signin?redirect=cart`);
    } else router?.push(`/signin`);
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(handleData)}>
          <Card className={styles.formCard}>
            <Typography>SignUp</Typography>
            <TextField
              control={control}
              name="firstName"
              label="First Name"
              type="text"
            />
            <TextField
              control={control}
              name="lastName"
              label="Last Name"
              type="text"
            />
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
            <TextField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography>Do not have account?</Typography>
              <Button onClick={handleAccount}>SignIn</Button>
            </div>
            <Button variant="contained" type="submit">
              SignUp
            </Button>
          </Card>
          {author ? (
            <Button onClick={() => router?.push(`/signup`)}>
              Signup as User
            </Button>
          ) : (
            <Button onClick={() => router?.push(`/signup?author=true`)}>
              Signup as author
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
