import axios from "axios";
import { useError } from "./useError";

export const useQueryCoupon = () => {
  const { switchErrorHandling } = useError();
  const getCoupon = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/post`,
      { withCredentials: true }
    );
    return data;
  };
  return { getCoupon };
};
