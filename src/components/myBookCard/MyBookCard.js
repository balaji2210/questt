import { Button, Typography } from "@mui/material";
import styles from "./MyBookCard.module.css";
import Image from "next/image";
import { Chip } from "@mui/material-next";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";

const MyBookCard = ({
  book = {},
  editBook = () => {},
  deleteBook = () => {},
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image
          alt="book"
          src={book?.image?.url}
          width={200}
          height={200}
          priority
        />
      </div>
      <div className={styles.details}>
        <Typography>{book?.title}</Typography>
        <Typography>{book?.description}</Typography>
        <div>
          <span>
            <Chip size="small" color="info" label={`₹ ${book?.price}`} />
          </span>

          <span>
            <Button onClick={() => editBook(book?._id)} size="small">
              <EditOutlined />
            </Button>
          </span>

          <span>
            <Button onClick={() => deleteBook(book?._id)} size="small">
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyBookCard;
