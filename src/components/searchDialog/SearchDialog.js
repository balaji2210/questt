import * as React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "components/utils";
import { Button } from "@mui/material";

import styles from "./SearchDialog.module.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    height: "55%",
  },
}));

const SearchDialogs = ({
  open = false,
  handleClose = () => {},
  control = {},
  name = "",
  handleSubmit = () => {},
  handleData = () => {},
}) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Search
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={styles.container} dividers>
          <form
            onSubmit={handleSubmit(handleData)}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <TextField
              control={control}
              name={name}
              placeholder="Search by Title,Description"
              label="Search"
              type="text"
            />
            <Button type="submit"> Search</Button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default SearchDialogs;
