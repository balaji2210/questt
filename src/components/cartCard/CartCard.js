import { Button, Typography } from "@mui/material";
import styles from "./CartCard.module.css";
import Image from "next/image";
import { Chip } from "@mui/material-next";
import { usePathname } from "next/navigation";
import moment from "moment";

const CartCard = ({ cartItem = {}, removeItem = () => {} }) => {
  const pathname = usePathname();

  return (
    <div className={styles.card}>
      <div>
        <Image
          alt="book"
          src={cartItem?.image}
          width={150}
          height={150}
          priority
        />
      </div>
      <div className={styles.details}>
        {pathname !== "/cart" ? (
          <Typography>{`OrderId: ${cartItem?._id?.slice(-10)}`}</Typography>
        ) : null}
        <Typography>{cartItem?.title}</Typography>
        <span>
          <Chip size="small" color="info" label={`₹ ${cartItem?.price}`} />
        </span>
        {pathname === "/cart" ? (
          <span>
            <Button onClick={() => removeItem(cartItem?.bookId)} size="small">
              Remove
            </Button>
          </span>
        ) : (
          <Typography>{`Order Date: ${moment(cartItem?.createdAt)?.format(
            "LLL"
          )}`}</Typography>
        )}
      </div>
    </div>
  );
};

export default CartCard;
