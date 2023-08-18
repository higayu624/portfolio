import Footer from "../footer";
import Header from "../header";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="layout flex-grow py-8">{children}</main>
        <Footer />
      </div>
    </>
  );
}
