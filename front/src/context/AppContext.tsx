import React, { Dispatch, useContext } from "react";

type PostInfo = {
  title: string;
  description: string;
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
  }
);

const LoginProvider = ({ children }: any) => {
  const [isLogin, setLogin] = React.useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

const UserContext = React.createContext(
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<React.SetStateAction<UserInfo>>;
    post: PostInfo;
    setPostInfo: Dispatch<React.SetStateAction<PostInfo>>;
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
      description: "",
    },
  });

  const [post, setPostInfo] = React.useState({
    title: "",
    description: "",
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, post, setPostInfo }}>
      {children}
    </UserContext.Provider>
  );
};

const useLoginContext = () => useContext(LoginContext);
const useUserContext = () => useContext(UserContext);

export { LoginProvider, useLoginContext, UserProvider, useUserContext };
