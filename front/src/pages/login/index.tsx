import { useMutateAuth } from "../../hooks/useMutateAuth";
import { LoginForm } from "../../components/loginform";
import { LoginFormContent } from "../../types";

const Login: React.FC = () => {
  const { loginMutation } = useMutateAuth();

  const submitAuthHandler = async (data: LoginFormContent) => {
    loginMutation.mutate({
      mail_address: data.mail_address,
      pass: data.pass,
    });
  };

  return <LoginForm submitAuthHandler={submitAuthHandler}></LoginForm>;
};

export default Login;
