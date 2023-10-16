import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useState } from "react";

extend(relativeTime);

export default function ModalContent({ coupon }: any) {
  const [bigDescription, setBigDescription] = useState(false);

  const clickFunc = () => {
    setBigDescription(!bigDescription);
  };
  if (bigDescription == true) {
    return (
      <div className="border mb-2 p-2">
        <p className="px-3 font-extrabold">{coupon.Post.title}</p>
        <div className="grid grid-cols-4 p-2 gap-4">
          <div className="border w-fit items-center justify-center">
            <Link href={`/`}>
              <img src="./img/okonomiyaki.png" width="100" />
            </Link>
          </div>
          <div className="col-span-3 overflow-hidden">
            <div className="">
              <button className="" onClick={clickFunc}>
                内容:
              </button>
              <br />
              <button className="" onClick={clickFunc}>
                {coupon.Post.description}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border mb-2 p-2">
        <p className="px-3 font-extrabold">{coupon.Post.title}</p>
        <div className="grid grid-cols-4 p-2 gap-4">
          <div className="border w-fit items-center justify-center">
            <Link href={`/`}>
              <img src="./img/okonomiyaki.png" width="100" />
            </Link>
          </div>
          <div className="col-span-3 overflow-hidden">
            <div className="whitespace-nowrap">
              <p>
                <button className="" onClick={clickFunc}>
                  内容:
                  <span className="ml-3">{coupon.Post.description}</span>
                </button>
              </p>
            </div>

            <a
              href={`${coupon.web_link}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" whitespace-nowrap"
            >
              <span>ホームページ:</span>
              <span className=" text-sm ml-3 text-blue-600 underline">
                {coupon.web_link}
              </span>
            </a>
            <br />
            <a
              href={`https://www.google.co.jp/maps/place/${coupon.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap"
            >
              <span>住所:</span>
              <span className="ml-3 text-blue-600 underline text-sm">
                {coupon.address}
              </span>
            </a>

            <p>
              投稿時間:
              <span className="ml-3">
                {dayjs(coupon.Post.create_time).fromNow()}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
