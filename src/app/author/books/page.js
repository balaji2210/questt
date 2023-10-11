"use client";

import MyBooks from "container/author/myBooks/MyBooks";
import withAuthAuthor from "helpers/withAuthAuthor";

const index = () => {
  return <MyBooks />;
};

export default withAuthAuthor(index);
