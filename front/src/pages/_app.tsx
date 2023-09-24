import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { LoginProvider, UserProvider } from "../context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <LoginProvider>
            <UserProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </LoginProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
