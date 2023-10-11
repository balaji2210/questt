import { getApiNew } from "./utils/getApi";

export const logOutUser = async () => {
  const response = await getApiNew(`auth/logout`);
  return response;
};
