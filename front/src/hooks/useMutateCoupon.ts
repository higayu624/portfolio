import { useMutation } from "react-query";
import { useError } from "./useError";
import axios from "axios";
import { NewPost } from "../types";

export const useMutateCoupon = () => {
  const { switchErrorHandling } = useError();

  const postMutation = useMutation(
    async (post: NewPost) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/user/post`, post, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {},
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );
  return { postMutation };
};
