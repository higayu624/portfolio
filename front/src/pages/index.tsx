import axios, { all } from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import hiroshimaJson from "../../HiroshimaJson/Hiroshima.json";
import MyModal from "../components/modal";

type Post = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  create_time: string;
  status: string;
};

type Response = {
  post: Post;
  display_name: string;
  family_name: string;
  given_name: string;
  id: number;
  mail_address: string;
  pass: string;
  place_id: number;
  user_role: number;
  user_status: number;
};

const Home: NextPage = () => {
  const [showMyModal, setshowMyModal] = useState(false);

  const handleOnClose = () => setshowMyModal(false);

  const [allPost, setAllPost] = useState<Response[]>([]);
  const [viewPost, setviewPost] = useState<Response[]>([]);

  useEffect(() => {
    const getInfo = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/home`).then((res) => {
        setAllPost(res.data);
      });
    };
    getInfo();
  }, []);

  const numToColor = (num: number): string => {
    let color = "white";
    if (num >= 1) {
      color = "#ADD8E6";
    } else if (num >= 10) {
      color = "#ADD8E6";
    } else if (num >= 30) {
      color = "#ADD8E6";
    }
    return color;
  }; //未使用の関数

  console.log("In home:", allPost);

  return (
    <>
      <div className="flex items-center justify-center border">
        <div className=" flex justify-center container border mx-5 ">
          <TransformWrapper>
            <TransformComponent>
              <svg
                width="800"
                height="800"
                viewBox="0 0 800 800"
                className="w-full h-full"
              >
                <g>
                  {hiroshimaJson.features.map((feature) => {
                    return (
                      <path
                        key={`path-${feature.id}`}
                        d={feature.d}
                        className="prefecture origin-center hover:stroke-slate-700 hover:stroke-2 hover:shadow-inner cursor-pointer duration-100 "
                        stroke="black"
                        strokeWidth={0.5}
                        fill={numToColor(
                          allPost
                            .filter((c: any) => c.Post.title !== "")
                            .filter(({ place_id }) => place_id === feature.id)
                            .length
                        )}
                        onClick={() => {
                          setshowMyModal(true);
                          setviewPost(
                            allPost.filter(
                              ({ place_id }) => place_id === feature.id
                            )
                          );
                        }}
                      />
                    );
                  })}
                </g>
              </svg>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
      <MyModal
        onClose={handleOnClose}
        visible={showMyModal}
        coupon={viewPost}
      />
    </>
  );
};

export default Home;
