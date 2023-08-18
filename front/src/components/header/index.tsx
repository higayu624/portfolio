import Link from "next/link";
import { useLoginContext } from "../../context/AppContext";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { isLogin, setLogin } = useLoginContext();
  const router = useRouter();
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
            <ul className="flex">
              {isLogin ? (
                <li key="master" className="ml-5">
                  <Link href={`/master`}>MyPage</Link>
                </li>
              ) : (
                ""
              )}
              {isLogin ? (
                <button
                  className="ml-5"
                  onClick={() => {
                    setLogin(false);
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              ) : (
                <li key="login" className="ml-5">
                  <Link href={`/login`}>Login</Link>
                </li>
              )}
              {isLogin ? (
                ""
              ) : (
                <li key="signup" className="ml-5">
                  <Link href={`/signup`}>SignUp</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
