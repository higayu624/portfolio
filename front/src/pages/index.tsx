import type { NextPage } from "next";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import hiroshimaJson from "../../HiroshimaJson/Hiroshima.json";

const Home: NextPage = () => {
  const onClick = (id: string) => {
    window.alert(id);
  };
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
                        className="prefecture origin-center hover:fill-gray-100 hover:stroke-slate-700 hover:stroke-2 cursor-pointer duration-100 "
                        stroke="black"
                        strokeWidth={0.5}
                        fill="white"
                        onClick={() => {
                          onClick(feature.id);
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
    </>
  );
};

export default Home;
