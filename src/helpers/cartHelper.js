export const removeDuplicates = (arr) => {
  const uniqueSet = new Set();
  const resultArray = [];

  for (const obj of arr) {
    if (!uniqueSet?.has(obj.bookId)) {
      uniqueSet?.add(obj.bookId);
      resultArray?.push(obj);
    }
  }

  return resultArray;
};

export const getTotalPrice = (cart = []) => {
  let amount = 0;
  cart?.forEach((item) => {
    amount += item?.price;
  });
  return amount?.toLocaleString("en-IN");
};
