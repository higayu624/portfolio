import { useRouter } from "next/router";
import { useLoginContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { useError } from "./useError";
import axios from "axios";
import { NewPost } from "../types";
import { useUserContext } from "../context/AppContext";

export const useMutateCoupon = () => {
  const router = useRouter();
  const { switchErrorHandling } = useError();
  const { userInfo, setUserInfo } = useUserContext();

  const postMutation = useMutation(
    async (post: NewPost) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/user/post`, post, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        const newUserInfo = {
          given_name: userInfo.given_name,
          family_name: userInfo.family_name,
          display_name: userInfo.display_name,
          mail_address: userInfo.mail_address,
          place_id: userInfo.place_id,
          post: {
            title: userInfo.post.title,
            description: userInfo.post.description,
          },
        };
        setUserInfo(newUserInfo);
      },
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );
  return { postMutation };
};
