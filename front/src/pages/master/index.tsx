import { useUserContext } from "../../context/AppContext";
import axios from "axios";

const Master: React.FC = () => {
  const { userInfo } = useUserContext();
  console.log(userInfo);
  const onClick = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/user`),
      {
        onSuccess: (res: any) => {
          console.log(res.data);
        },
        onError: (err: any) => {
          console.log("error");
        },
      };
  };
  return (
    <>
      Master page
      <button onClick={onClick}>get</button>
    </>
  );
};

export default Master;
