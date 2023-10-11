import axios from "axios";

export const postApi = async (url, payLoad) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      payLoad,
      { withCredentials: true }
    );
    return {
      data: data?.data,
      message: data?.message,
      success: status === 200,
    };
  } catch (error) {
    return {
      data: null,
      message: error?.response?.data?.error || "Server Error",
      success: false,
    };
  }
};
