import axios from "axios";

export const postApi = async (url, payLoad) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage?.getItem("token") : null;
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      payLoad,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
