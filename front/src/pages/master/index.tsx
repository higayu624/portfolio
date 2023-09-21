import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../context/AppContext";
import { validationPostSchema } from "../../utils/validationSchema";
import { useMutateCoupon } from "../../hooks/useMutateCoupon";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

interface CouponForm {
  title: string;
  description: string;
  status: boolean;
}

const Master: React.FC = () => {
  const { userInfo } = useUserContext();
  const { postMutation } = useMutateCoupon();
  console.log(userInfo);
  const onClick = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/user`),
      {
        onSuccess: (res: any) => {
          console.log(res.data);
        },
        onError: (err: any) => {
          console.log("error");
        },
      };
  };

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

  const clickCopy = () => {
    setValue("title", userInfo.post.title);
    setValue("description", userInfo.post.desctiption);
  };

  const submitWorkspaceHandler = async (data: CouponForm) => {
    postMutation
      .mutateAsync({
        title: data.title,
        description: data.description,
        status: true,
      })
      .then(() => {
        reset();
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border flex flex-col justify-center items-center rounded-lg  w-4/5 max-w-screen-md">
          <div className="mb-3">前回の投稿</div>
          <div className="grid grid-cols-3 w-4/5 max-w-screen-md">
            <p>タイトル</p>
            <p className="flex justify-center col-span-2 mb-3">
              {userInfo.post.title ? userInfo.post.title : "--"}
            </p>

            <p>詳細</p>
            <p className="flex justify-center col-span-2 mb-3">
              {userInfo.post.desctiption ? userInfo.post.desctiption : "--"}
            </p>
          </div>
          <button
            className="font-bold border-2 shadow-lg hover:shadow-none rounded-2xl transition duration-150 ease-in-out px-5 m-2"
            onClick={clickCopy}
          >
            copy
          </button>
        </div>
      </div>

      <form className="" onSubmit={handleSubmit(submitWorkspaceHandler)}>
        <div className="pt-2 flex flex-col justify-center items-center">
          <div className="flex flex-col py-2 justify-center items-center border rounded-lg w-4/5 max-w-screen-md">
            新規投稿
            <div className="mt-2 grid grid-cols-3 w-4/5">
              <label htmlFor="title">タイトル</label>
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
              <label htmlFor="description">詳細</label>
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
            <button
              type="submit"
              className="font-bold border-2 shadow-lg hover:shadow-none rounded-2xl transition duration-150 ease-in-out px-5 m-2"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Master;
