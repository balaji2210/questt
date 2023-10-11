import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Chip from "@mui/material-next/Chip";
import Image from "next/image";

import styles from "./HomeCard.module.css";
import { useRouter } from "next/navigation";

export default function HomeCard({ book }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router?.push(`/book?bookId=${book?._id}`)}
      className={styles.card}
      sx={{ maxWidth: 345, cursor: "pointer" }}
    >
      <div>
        <Image
          src={book?.image?.url}
          alt="green iguana"
          width={350}
          height={350}
          priority
        />
      </div>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <Chip
            variant="filled"
            color="info"
            size="small"
            label={book?.title}
          />
        </div>
        <Typography variant="body2" color="text.secondary">
          {book?.description?.slice(0, 100)?.concat("...")}
        </Typography>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Chip
            variant="filled"
            color="info"
            size="small"
            label={`₹ ${book?.price} `}
          />
          <Chip variant="filled" color="info" size="small" label="See More" />
        </div>
      </CardContent>
    </Card>
  );
}
