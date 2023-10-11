import axios from "axios";

export const getApiNew = async (url) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
      { withCredentials: true }
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
