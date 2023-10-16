import ModalContent from "./modalContent";

export default function MyModal({ onClose, visible, coupon }: any) {
  const handleOnClose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  if (coupon.filter((c: any) => c.Post.title !== "").length === 0) {
    return (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-5 rounded">
          <p>クーポン情報はありません</p>
        </div>
      </div>
    );
  }

  console.log("IN modal:", coupon);

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="rounded overflow-hidden p-2">
        <div className="bg-slate-400">
          <header className="flex justify-start items-center p-2 font-bold">
            クーポン一覧
          </header>
        </div>
        <div className="bg-white h-96 overflow-y-scroll p-5">
          {coupon.map((coupon: any) =>
            coupon.Post.title ? <ModalContent coupon={coupon} /> : ""
          )}
        </div>
      </div>
    </div>
  );
}
