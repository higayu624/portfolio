import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMutateUser } from "../../hooks/useMutateUser";
import { RequiredInformation } from "../../types";
import { hiroshimas } from "../../../data/hiroshima";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationUpdateUserSchema } from "../../utils/validationSchema";
import { useForm } from "react-hook-form";
import { useLoginContext } from "../../context/AppContext";
import { useRouter } from "next/router";

dayjs.locale("ja");

const Setting: React.FC = () => {
  const { isLogin, setLogin } = useLoginContext();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    given_name: "",
    family_name: "",
    display_name: "",
    mail_address: "",
    place_id: 0,
    web_link: "",
    address: "",
    pass: "",
    user_role: 0,
    user_status: 0,
  });
  const [editedUserInfo, setEditedUserInfo] = useState({
    given_name: "",
    family_name: "",
    display_name: "",
    mail_address: "",
    place_id: 0,
    web_link: "",
    address: "",
    pass: "",
    user_role: 0,
    user_status: 0,
  });
  const [post, setPost] = useState({ title: "", description: "" });

  async function getPostAsync() {
    const url = `${process.env.REACT_APP_API_URL}/user`;
    const response = await fetch(url, { mode: "cors", credentials: "include" });
    const json = await response.json();
    return json;
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryFn: () => {
      return getPostAsync();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  interface updateForm {
    display_name: string;
    given_name: string;
    family_name: string;
    web_link: string;
    address: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<updateForm>({
    mode: "onSubmit",
    resolver: zodResolver(validationUpdateUserSchema),
    defaultValues: editedUserInfo,
  });

  useEffect(() => {
    if (!isLogin) {
      window.alert("ログインしてください");
      router.push("/");
    } else {
      if (!isLoading && !error) {
        console.log(data);
        setUserInfo({
          given_name: data.given_name,
          family_name: data.family_name,
          display_name: data.display_name,
          mail_address: data.mail_address,
          place_id: data.place_id,
          web_link: data.web_link,
          address: data.address,
          pass: data.pass,
          user_role: data.user_role,
          user_status: data.user_status,
        });
        setEditedUserInfo({
          given_name: data.given_name,
          family_name: data.family_name,
          display_name: data.display_name,
          mail_address: data.mail_address,
          place_id: data.place_id,
          web_link: data.web_link,
          address: data.address,
          pass: data.pass,
          user_role: data.user_role,
          user_status: data.user_status,
        });
        setPost({
          title: data.Post.title,
          description: data.Post.description,
        });
        setValue("display_name", data.display_name);
        setValue("family_name", data.family_name);
        setValue("given_name", data.given_name);
        setValue("address", data.address);
        setValue("web_link", data.web_link);
        //コンパクトに書けないか...?
      }
    }
  }, [data]);

  const { updateMutation } = useMutateUser();

  const toId = (place: string) => {
    const split = place.split(/(市|町)/);
    console.log(split);
    const agreement = hiroshimas.filter(
      (hirosima) => hirosima.name.indexOf(split[0]) === 0
    );
    console.log(agreement);

    return agreement.length > 0 ? agreement[0].id : 0;
  };

  const submitUpdateUserHandler = async (data: updateForm) => {
    let id = 0;
    id = toId(data.address);
    if (id === 0) {
      window.alert("お店の住所が正しいかご確認ください。");
      return;
    }
    updateMutation
      .mutateAsync({
        given_name: data.given_name,
        family_name: data.family_name,
        display_name: data.display_name,
        mail_address: userInfo.mail_address,
        place_id: id,
        web_link: data.web_link,
        address: data.address,
        user_role: userInfo.user_role,
        user_status: userInfo.user_status,
        pass: userInfo.pass,
        post: {
          title: post.title,
          description: post.description,
        },
      })
      .then(() => {
        console.log(data);
        window.alert("編集内容の登録に成功しました.");
        refetch();
      })
      .catch((err) => {
        window.alert("登録に失敗しました.");
        console.error(err);
      });
  };

  return (
    <div className="">
      <form
        className="flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit(submitUpdateUserHandler)}
      >
        <p className="mb-5 font-medium">ユーザ情報の確認と変更</p>
        <div className="grid grid-cols-2 justify-center items-center">
          <p className="font-bold">表示名</p>
          <div className="flex">
            <input
              type="text"
              value={editedUserInfo.display_name}
              className="form-input mr-2"
              {...register("display_name")}
              placeholder="未設定"
              onChange={(e) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  display_name: e.target.value,
                });
              }}
            />
            {userInfo.display_name == editedUserInfo.display_name ? (
              <div className="border w-3 h-3 rounded-xl"></div>
            ) : (
              <div className="border w-3 h-3 rounded-xl text-center">
                <div className="border w-full h-full rounded-xl bg-red-500 m-auto"></div>
              </div>
            )}
          </div>
          <p className="text-rose-600">
            {errors.display_name?.message
              ? (("※" + errors.display_name?.message) as React.ReactNode)
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center">
          <p className="font-bold">family_name</p>
          <div className="flex">
            <input
              type="text"
              value={editedUserInfo.family_name}
              className="form-input mr-2"
              {...register("family_name")}
              onChange={(e) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  family_name: e.target.value,
                });
              }}
            />
            {userInfo.family_name == editedUserInfo.family_name ? (
              <div className="border w-3 h-3 rounded-xl"></div>
            ) : (
              <div className="border w-3 h-3 rounded-xl text-center">
                <div className="border w-full h-full rounded-xl bg-red-500 m-auto"></div>
              </div>
            )}
          </div>
          <p className="text-rose-600">
            {errors.family_name?.message
              ? (("※" + errors.family_name?.message) as React.ReactNode)
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center">
          <p className="font-bold">given_name</p>
          <div className="flex">
            <input
              type="text"
              value={editedUserInfo.given_name}
              className="form-input mr-2"
              {...register("given_name")}
              onChange={(e) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  given_name: e.target.value,
                });
              }}
            />
            {userInfo.given_name == editedUserInfo.given_name ? (
              <div className="border w-3 h-3 rounded-xl"></div>
            ) : (
              <div className="border w-3 h-3 rounded-xl text-center">
                <div className="border w-full h-full rounded-xl bg-red-500 m-auto"></div>
              </div>
            )}
          </div>
          <p className="text-rose-600">
            {errors.given_name?.message
              ? (("※" + errors.given_name?.message) as React.ReactNode)
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 justify-start items-center">
          <p className="font-bold">メールアドレス</p>
          <div className="flex">
            <input
              type="text"
              value={editedUserInfo.mail_address}
              className="form-input mr-2"
              readOnly
            />
            <div className="border w-3 h-3 rounded-xl text-center">
              <div className="border w-full h-full rounded-xl bg-slate-700 m-auto"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center">
          <p className="font-bold">お店の住所</p>
          <div className="flex">
            <input
              type="text"
              value={editedUserInfo.address}
              className="form-input mr-2"
              {...register("address")}
              placeholder="例) 広島市・・・"
              onChange={(e) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  address: e.target.value,
                });
              }}
            />
            {userInfo.address == editedUserInfo.address ? (
              <div className="border w-3 h-3 rounded-xl"></div>
            ) : (
              <div className="border w-3 h-3 rounded-xl text-center">
                <div className="border w-full h-full rounded-xl bg-red-500 m-auto"></div>
              </div>
            )}
          </div>
          <p className="text-rose-600">
            {errors.address?.message
              ? (("※" + errors.address?.message) as React.ReactNode)
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className=""></div>
          <div className="">
            ※
            <span className="underline text-sm">
              広島県以下の住所を登録してください。
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-center items-center">
          <p className="font-bold">ホームページ</p>
          <div className="flex">
            <input
              type="text"
              value={editedUserInfo.web_link}
              className="form-input mr-2"
              placeholder="未設定"
              {...register("web_link")}
              onChange={(e) => {
                setEditedUserInfo({
                  ...editedUserInfo,
                  web_link: e.target.value,
                });
              }}
            />
            {userInfo.web_link == editedUserInfo.web_link ? (
              <div className="border w-3 h-3 rounded-xl"></div>
            ) : (
              <div className="border w-3 h-3 rounded-xl text-center">
                <div className="border w-full h-full rounded-xl bg-red-500 m-auto"></div>
              </div>
            )}
          </div>
          <p className="text-rose-600">
            {errors.web_link?.message
              ? (("※" + errors.web_link?.message) as React.ReactNode)
              : ""}
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              setEditedUserInfo({ ...userInfo });
              console.log(editedUserInfo);
            }}
            className="font-bold border-2 shadow-lg hover:shadow-none rounded-2xl transition duration-150 ease-in-out px-5 m-2"
          >
            リセット
          </button>
          <button
            type="submit"
            className="font-bold border-2 shadow-lg hover:shadow-none rounded-2xl transition duration-150 ease-in-out px-5 m-2"
            disabled={
              userInfo.address == editedUserInfo.address &&
              userInfo.display_name == editedUserInfo.display_name &&
              userInfo.family_name == editedUserInfo.family_name &&
              userInfo.given_name == editedUserInfo.given_name &&
              userInfo.web_link == editedUserInfo.web_link
            }
          >
            登録
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
