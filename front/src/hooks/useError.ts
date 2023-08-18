import { useRouter } from "next/router";

export const useError = () => {
  const router = useRouter();

  const switchErrorHandling = (msg: string) => {
    console.log("Check Now");
    switch (msg) {
      case "Unauthorized":
        alert("ログインしてください.");
        router.push("/login");
      case "Request failed with status code 400":
        alert("ログイン情報が間違えています.");
      default:
        alert(msg);
    }
  };
  return { switchErrorHandling };
};
