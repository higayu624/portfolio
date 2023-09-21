import React, { Dispatch, useContext } from "react";

type PostInfo = {
  title: string;
  desctiption: string;
};

type UserInfo = {
  given_name: string;
  family_name: string;
  display_name: string;
  mail_address: string;
  place_id: number;
  post: PostInfo;
};

const LoginContext = React.createContext(
  {} as {
    isLogin: boolean;
    setLogin: Dispatch<React.SetStateAction<boolean>>;
    jwt: string;
    setJwt: Dispatch<React.SetStateAction<string>>;
  }
);

const LoginProvider = ({ children }: any) => {
  const [isLogin, setLogin] = React.useState(false);
  const [jwt, setJwt] = React.useState("");

  return (
    <LoginContext.Provider value={{ isLogin, setLogin, jwt, setJwt }}>
      {children}
    </LoginContext.Provider>
  );
};

const UserContext = React.createContext(
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<React.SetStateAction<UserInfo>>;
  }
);

const UserProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = React.useState({
    given_name: "",
    family_name: "",
    display_name: "",
    mail_address: "",
    place_id: 0,
    post: {
      title: "",
      desctiption: "",
    },
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
const useUserContext = () => useContext(UserContext);

export { LoginProvider, useLoginContext, UserProvider, useUserContext };
