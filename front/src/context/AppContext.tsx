import React, { Dispatch, useContext } from "react";

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

const useLoginContext = () => useContext(LoginContext);

export { LoginProvider, useLoginContext };
