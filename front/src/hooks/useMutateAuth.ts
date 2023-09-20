import { useRouter } from "next/router";
import { useLoginContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { useError } from "./useError";
import axios from "axios";
import { Credential, RequiredInformation } from "../types";
import { useUserContext } from "../context/AppContext";

export const useMutateAuth = () => {
  const router = useRouter();
  const { setLogin, setJwt } = useLoginContext();
  const { switchErrorHandling } = useError();
  const { setUserInfo } = useUserContext();

  const loginMutation = useMutation(
    async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        setJwt(res.data.jwt);
        setLogin(true);
        router.push("/master");
        setUserInfo({
          given_name: res.data.given_name,
          family_name: res.data.family_name,
          display_name: res.data.display_name,
          mail_address: res.data.mail_address,
          place_id: res.data.place_id,
          post: {
            title: res.data.Post.title,
            desctiption: res.data.Post.desctiption,
          },
        }); //resに含まれる情報をユーザ情報としてcontextに保存する
      },
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );

  const signUpMutation = useMutation(
    async (user: RequiredInformation) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/signUp`, user, {
        withCredentials: true,
      }),
    {
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );

  //未設定
  const logOutMutation = useMutation(
    async (user: RequiredInformation) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        console.log(res.data);
        console.log(res.headers["set-cookie"]);
        router.push("/master");
      },
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );

  return { loginMutation, signUpMutation };
};
