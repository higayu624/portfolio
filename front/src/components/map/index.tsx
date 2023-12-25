import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import hiroshimaJson from "../../../HiroshimaJson/Hiroshima.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { Response } from "../../types";
import { numToColor } from "../../utils/numtocolor";

export const HiroshimaMap = (props: {
  setshowMyModal: any;
  setviewPost: any;
}) => {
  //すべてのクーポン情報をfetchして、stateに確保する.
  //useQueryを使って五分くらいキャッシュしてもいいかもしれない.
  const [allPost, setAllPost] = useState<Response[]>([]);
  useEffect(() => {
    const getInfo = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}/home`).then((res) => {
        setAllPost(res.data);
      });
    };
    getInfo();
  }, []);

  //TransformWrapperやTransFormComponent+svgでzoomやmoveを可能にしている.
  return (
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
                {hiroshimaJson.features.map((feature: any) => {
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
                        props.setshowMyModal(true);
                        props.setviewPost(
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
  );
};
