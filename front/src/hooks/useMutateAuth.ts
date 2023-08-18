import { useRouter } from "next/router";
import { useLoginContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { useError } from "./useError";
import axios from "axios";
import { Credential } from "../types";
import { useUserContext } from "../context/AppContext";
import { useCookies } from "react-cookie";

export const useMutateAuth = () => {
  const router = useRouter();
  const { setLogin } = useLoginContext();
  const { switchErrorHandling } = useError();
  const { setUserInfo } = useUserContext();
  const [cookie] = useCookies();

  const loginMutation = useMutation(
    async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user),
    {
      onSuccess: (res) => {
        console.log(res.data);
        console.log(res);
        console.log(cookie.mailAddress);
        setLogin(true);
        router.push("/master");
        setUserInfo({
          given_name: "あ",
          family_name: "い",
          display_name: "う",
          mail_address: "え",
          place_id: 0,
          post: {
            title: "あ",
            desctiption: "あ",
          },
        }); //resに含まれる情報をユーザ情報としてcontextに保存する
      },
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );
  return { loginMutation };
};
