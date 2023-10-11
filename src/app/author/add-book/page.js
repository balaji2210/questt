"use client";

import AddBook from "container/author/addBook/AddBook";
import withAuthAuthor from "helpers/withAuthAuthor";

const index = () => {
  return <AddBook />;
};

export default withAuthAuthor(index);
