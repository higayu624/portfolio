import ModalContent from "./modalContent";

export default function MyModal({ onClose, visible, coupon }: any) {
  const handleOnClose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  if (coupon.length === 0) {
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
      <div className="bg-white p-5 rounded">
        {coupon.map((coupon: any) => (
          <ModalContent coupon={coupon} />
        ))}
      </div>
    </div>
  );
}
