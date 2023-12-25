import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationPostSchema } from "../../utils/validationSchema";
import { useMutateCoupon } from "../../hooks/useMutateCoupon";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { CouponForm } from "../../types";
import { PreviousPost } from "./PreviousPost";

dayjs.locale("ja");

export const MasterForm = (props: {
  refetch: any;
  setLatestPost: any;
  latestPost: any;
  isLoading: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CouponForm>({
    mode: "onChange",
    resolver: zodResolver(validationPostSchema),
  });

  const { postMutation } = useMutateCoupon();

  const clickCopy = () => {
    setValue("title", props.latestPost.title);
    setValue("description", props.latestPost.description);
  };

  //クーポンの発行
  //発行が成功すればstateを更新する.
  const submitCouponHandler = async (data: CouponForm) => {
    postMutation
      .mutateAsync({
        title: data.title,
        description: data.description,
        status: true,
      })
      .then(() => {
        props.setLatestPost({
          title: data.title,
          description: data.description,
        });
        reset();
        props.refetch();
      });
  };
  return (
    <>
      {props.isLoading ? (
        <PreviousPost
          latestPost={{ title: "Loading", description: "Loading" }}
        ></PreviousPost>
      ) : (
        <PreviousPost latestPost={props.latestPost}></PreviousPost>
      )}
      <form className="" onSubmit={handleSubmit(submitCouponHandler)}>
        <div className="pt-2 flex flex-col justify-center items-center">
          <div className="flex flex-col py-2 justify-center items-center border rounded-lg w-4/5 max-w-screen-md">
            <p className=" font-medium">新規投稿</p>
            <div className="mt-2 grid grid-cols-3 w-4/5">
              <label htmlFor="title" className=" font-medium">
                タイトル
              </label>
              <textarea
                id="title"
                rows={3}
                {...register("title")}
                placeholder="title"
                className="block col-span-2 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              />
              <p className="text-rose-600">
                {errors.title?.message
                  ? (("※" + errors.title?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-3 w-4/5 max-w-screen-md">
              <label htmlFor="description" className=" font-medium">
                詳細
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="description"
                rows={10}
                className="block col-span-2 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              />
              <p className="text-rose-600">
                {errors.description?.message
                  ? (("※" + errors.description?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>
            <div className="my-4">
              <button
                className="font-bold border-2 shadow-md hover:shadow-none rounded-2xl transition duration-150 ease-in-out px-5 m-2"
                onClick={clickCopy}
                type="button"
              >
                previous
              </button>
              <button
                type="submit"
                className="font-bold border-2 shadow-md hover:shadow-none rounded-2xl transition duration-150 ease-in-out px-5 m-2"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
