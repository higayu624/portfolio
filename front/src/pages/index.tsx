import type { NextPage } from "next";
import { useState } from "react";
import { HiroshimaMap } from "../components/map";
import MyModal from "../components/modal";
import { Response } from "../types";

const Home: NextPage = () => {
  //クーポン一覧のモーダルの表示・非表示
  const [showMyModal, setshowMyModal] = useState(false);
  const handleOnClose = () => setshowMyModal(false);

  //クーポンの内容を市町ごとに選択するstate
  const [viewPost, setviewPost] = useState<Response[]>([]);

  return (
    <>
      <HiroshimaMap
        setshowMyModal={setshowMyModal}
        setviewPost={setviewPost}
      ></HiroshimaMap>
      <MyModal
        onClose={handleOnClose}
        visible={showMyModal}
        coupon={viewPost}
      />
    </>
  );
};

export default Home;
