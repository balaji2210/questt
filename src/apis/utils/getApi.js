import axios from "axios";

export const getApiNew = async (url) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage?.getItem("token") : null;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      data: data?.data,
      message: data?.message,
      success: true,
    };
  } catch (error) {
    throw error?.response?.data?.error || "Server Error";
  }
};
