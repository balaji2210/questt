"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import styles from "./NavBar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/features/userSlice";
import toast from "react-hot-toast";
import { logOutUser } from "apis/useGetLogoutUser";
import { Drawer } from "@mui/material";
import { CloseOutlined, Crop54, SearchOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import SearchDialogs from "components/searchDialog/SearchDialog";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  search: "",
};

const formSchema = yup.object().shape({
  search: yup.string().required(),
});

function NavBar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);

  const [openDialog, setOpenDialog] = React.useState(false);

  const cart = useSelector((state) => state.cart.cart);

  const router = useRouter();

  const dispatch = useDispatch();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage?.removeItem("user_id");
      localStorage?.removeItem("userType");
      localStorage?.removeItem("token");
      localStorage?.removeItem("email");
      dispatch(logout());
      const response = await logOutUser();
      if (response?.success) {
        toast?.success(response?.message);
      }
      router?.push(`/`);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSearchData = async (data) => {
    setOpenDialog(false);
    router?.push(`/search?query=${data?.search}`);
    setValue("search", "");
  };

  return (
    <AppBar position="static">
      <Container sx={{ padding: "1.5rem" }} maxWidth="xl">
        <div className={styles.container}>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => router?.push("/")}
          >
            Books
          </Typography>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => router?.push("/myorders")}
              >
                My Orders
              </Typography>

              {user?.userType === "author" ? (
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => router?.push("/author/add-book")}
                >
                  Add Book
                </Typography>
              ) : null}
              {user?.userType === "author" ? (
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => router?.push("/author/books")}
                >
                  My Books
                </Typography>
              ) : null}
            </div>
          ) : null}
          <div className={styles.navRight}>
            <div
              onClick={() => setOpenDialog(true)}
              style={{ cursor: "pointer" }}
            >
              <SearchOutlined />
            </div>
            <div
              onClick={() => router?.push("/cart")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              {cart?.length ? (
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    position: "absolute",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    bottom: "1rem",
                  }}
                >
                  {cart?.length}
                </div>
              ) : null}
              <ShoppingCartIcon />
            </div>
            {!isAuthenticated && (
              <Link
                href="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                SignIn
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                href="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                SignUp
              </Link>
            )}
            {isAuthenticated ? (
              <Button onClick={() => handleLogout()} sx={{ color: "white" }}>
                Logout
              </Button>
            ) : null}
          </div>
        </div>
        <div className={styles.mobileContainer}>
          {isAuthenticated ? (
            <div style={{ cursor: "pointer" }}>
              <MenuIcon onClick={() => setOpen(true)} />
            </div>
          ) : null}
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => router?.push("/")}
          >
            Books
          </Typography>
          <div className={styles.navRight}>
            <div
              onClick={() => setOpenDialog(true)}
              style={{ cursor: "pointer" }}
            >
              <SearchOutlined />
            </div>
            <div
              onClick={() => router?.push("/cart")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              {cart?.length ? (
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    position: "absolute",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    bottom: "1rem",
                  }}
                >
                  {cart?.length}
                </div>
              ) : null}
              <ShoppingCartIcon />
            </div>

            {!isAuthenticated && (
              <Link
                href="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                SignIn
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                href="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                SignUp
              </Link>
            )}
            {isAuthenticated ? (
              <Button onClick={() => handleLogout()} sx={{ color: "white" }}>
                Logout
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            width: "15rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "0.5rem",
              cursor: "pointer",
              top: "0.2rem",
            }}
            onClick={() => setOpen(false)}
          >
            <CloseOutlined />
          </div>
          <div>
            {isAuthenticated ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    router?.push("/myorders");
                    setOpen(false);
                  }}
                >
                  My Orders
                </Typography>

                {user?.userType === "author" ? (
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      router?.push("/author/add-book");
                      setOpen(false);
                    }}
                  >
                    Add Book
                  </Typography>
                ) : null}
                {user?.userType === "author" ? (
                  <Typography
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      router?.push("/author/books");
                      setOpen(false);
                    }}
                  >
                    My Books
                  </Typography>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Drawer>
      <SearchDialogs
        control={control}
        open={openDialog}
        name="search"
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleData={handleSearchData}
      />
    </AppBar>
  );
}
export default NavBar;
