import { useRouter } from "next/router";
import { useLoginContext } from "../context/AppContext";
import { useMutation } from "react-query";
import { useError } from "./useError";
import axios from "axios";
import { RequiredInformation } from "../types";

export const useMutateUser = () => {
  const router = useRouter();
  const { switchErrorHandling } = useError();

  const updateMutation = useMutation(
    async (put: RequiredInformation) =>
      await axios.put(`${process.env.REACT_APP_API_URL}/user`, put, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {},
      onError: (err: any) => {
        switchErrorHandling(err.message);
      },
    }
  );
  return { updateMutation };
};
