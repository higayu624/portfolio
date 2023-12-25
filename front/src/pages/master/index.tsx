import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLoginContext } from "../../context/AppContext";
import { useRouter } from "next/router";
import { MasterForm } from "../../components/masterform";
import { useQueryCoupon } from "../../hooks/useQueryCoupon";

const Master: React.FC = () => {
  const { isLogin } = useLoginContext();
  const router = useRouter();
  const { getCoupon } = useQueryCoupon();

  const [latestPost, setLatestPost] = useState({
    title: "",
    description: "",
  });

  const { isLoading, error, data, refetch } = useQuery({
    queryFn: () => {
      return getCoupon();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (!isLogin) {
      window.alert("ログインしてください");
      router.push("/");
    } else {
      if (!isLoading && !error) {
        setLatestPost({
          title: data.title,
          description: data.description,
        });
      }
    }
  }, [data]);

  return (
    <MasterForm
      refetch={refetch}
      setLatestPost={setLatestPost}
      latestPost={latestPost}
      isLoading={isLoading}
    ></MasterForm>
  );
};

export default Master;
