import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

extend(relativeTime);

export default function ModalContent({ coupon }: any) {
  return (
    <div className="border mb-2 p-2">
      <p className="px-3">title:{coupon.Post.title}</p>
      <div className="grid grid-cols-4 p-2 gap-4">
        <div className="border p-5">写真</div>
        <div className="col-span-3 overflow-hidden">
          <div className="whitespace-nowrap">
            <p>
              <button className="">内容:</button>
              {coupon.Post.description}
            </p>
          </div>
          <p>
            ホームページ:
            <a href=""></a>
          </p>
          <p>
            住所:
            <a href=""></a>
          </p>
          <p>投稿時間:{dayjs(coupon.Post.create_time).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
