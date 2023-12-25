import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSignupSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useMutateAuth } from "../../hooks/useMutateAuth";
import { Zipcode, Address, SignUpForm } from "../../types";
import { toId } from "../../utils/addressToId";
import { InputFormWithZod } from "../../components/InputFormWithZod";

const SignUp: React.FC = () => {
  //郵便番号のstate
  const [zipcode, setZipcodeMain] = useState<Zipcode>({
    main: "",
    sub: "",
  });
  //住所のstate
  const [address, setAddress] = useState<Address>({
    address1: "",
    address2: "",
    address3: "",
    address: "",
  });

  //郵便番号を変更するたびに住所も変更する.
  const updateZipcodeMain = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ main: e.target.value, sub: "" });
    setAddress({
      address1: "",
      address2: "",
      address3: "",
      address: "",
    });
  };
  //郵便番号を変更するたびに住所も変更する.
  //郵便番号が正しい書式で入力された際に郵便局のapiから住所をfetchする.
  const updateZipcodeSub = async (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ ...zipcode, sub: e.target.value });
    setAddress({
      address1: "",
      address2: "",
      address3: "",
      address: "",
    });
    if (e.target.value.length === 4 && zipcode.main.length === 3) {
      try {
        const res = await axios.get(
          "https://zipcloud.ibsnet.co.jp/api/search",
          {
            params: {
              zipcode: zipcode.main + e.target.value,
            },
          }
        );
        if (res.data.results) {
          const result = res.data.results[0];
          setAddress({
            ...address,
            address1: result["address1"],
            address2: result["address2"],
            address3: result["address3"],
            address: result["address2"] + result["address3"],
          });
        }
      } catch {
        alert("住所の取得に失敗しました。");
      }
    }
  };

  //signUp後にloginも行う
  const { signUpMutation, loginMutation } = useMutateAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onChange",
    resolver: zodResolver(validationSignupSchema),
  });

  //submitボタンを押したときに実行する関数
  //signUpMutationでsignUpができたら同様のデータを用いてloginMutationでloginする.
  const onSubmit = async (data: SignUpForm) => {
    await signUpMutation
      .mutateAsync({
        mail_address: data.email,
        pass: data.password,
        given_name: data.givenName,
        family_name: data.familyName,
        user_role: 0,
        user_status: 0,
        display_name: data.displayName,
        place_id: toId(address.address2),
        web_link: "",
        address: address.address,
        post: {
          title: "",
          description: "",
        },
      })
      .then(() =>
        loginMutation.mutate({
          mail_address: data.email,
          pass: data.password,
        })
      );
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-4 ms:flex-col py-6">
        <div className="w-11/12 max-w-lg max-full">
          <div className="flex items-center justify-center py-3 bg-gray-100 font-bold mb-6">
            <h1>SignUp</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="mb-6">
              <InputFormWithZod
                register={register}
                id={"familyName"}
              ></InputFormWithZod>
              <p className="text-rose-600">
                {errors.familyName?.message
                  ? (("※" + errors.familyName?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <InputFormWithZod
                register={register}
                id={"givenName"}
              ></InputFormWithZod>
              <p className="text-rose-600">
                {errors.givenName?.message
                  ? (("※" + errors.givenName?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <InputFormWithZod
                register={register}
                id={"displayName"}
              ></InputFormWithZod>
            </div>

            <div className="mb-6">
              メールアドレス
              <InputFormWithZod
                register={register}
                id={"email"}
              ></InputFormWithZod>
              <p className="text-rose-600">
                {errors.email?.message
                  ? (("※" + errors.email?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              パスワード
              <InputFormWithZod
                register={register}
                id={"password"}
              ></InputFormWithZod>
              <p className="text-rose-600">
                {errors.password?.message
                  ? (("※" + errors.password?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-start items-center">
                <span>〒</span>
                <input
                  id="place1"
                  type="number"
                  {...register("place1")}
                  className="address-form"
                  onChange={updateZipcodeMain}
                  value={zipcode.main}
                />
                <span>-</span>
                <input
                  id="place2"
                  type="number"
                  {...register("place2")}
                  className="address-form"
                  onChange={updateZipcodeSub}
                  value={zipcode.sub}
                />
              </div>
              <p className="text-rose-600">
                {errors.place1?.message ? (
                  (("※" + errors.place1?.message) as React.ReactNode)
                ) : (
                  <>
                    {errors.place2?.message
                      ? (("※" + errors.place2?.message) as React.ReactNode)
                      : ""}
                  </>
                )}
              </p>
            </div>

            <div className="mb-6">
              <input
                id="address"
                type="address"
                {...register("address")}
                placeholder="address(広島市・・・)"
                className="form-input"
                value={address.address}
                onChange={(e) => {
                  setAddress({ ...address, address: e.target.value });
                }}
              />
              <p>
                ※
                <span className="underline">
                  広島県以下の住所を登録してください。
                </span>
              </p>
              <p className="text-rose-600">
                {errors.address?.message
                  ? (("※" + errors.address?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <button type="submit" className=" w-full font-bold border">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
