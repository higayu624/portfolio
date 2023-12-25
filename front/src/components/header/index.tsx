import Link from "next/link";
import { useLoginContext } from "../../context/AppContext";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { isLogin, setLogin } = useLoginContext();
  const router = useRouter();

  const logoutFunction = async () => {
    const url = `${process.env.REACT_APP_API_URL}/logout`;
    await fetch(url, { mode: "cors", credentials: "include" }).then(() => {
      setLogin(false);
      window.alert("ログアウトしました.");
      router.push("/");
    });
  };

  return (
    <header className="border-b max-h-30 border-gray-200 px-5 md:px-20">
      <div className="flex items-center justify-start">
        <div>
          <Link href={`/`}>
            <img src="./img/logo.png" width="100" />
          </Link>
        </div>
        <div className="grow"></div>
        <div className="mr-5">
          <nav className="md:mx-auto font-bold">
            <ul className="flex gap-12">
              {isLogin ? (
                <>
                  <li key="setting">
                    <Link href={`/setting`}>Setting</Link>
                  </li>
                  <li key="master">
                    <Link href={`/master`}>MyPage</Link>
                  </li>
                  <button onClick={logoutFunction}>Logout</button>
                </>
              ) : (
                <>
                  <li key="login">
                    <Link href={`/login`}>Login</Link>
                  </li>
                  <li key="signup">
                    <Link href={`/signup`}>SignUp</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
