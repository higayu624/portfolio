import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSignupSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginContext } from "../../context/AppContext";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useMutateAuth } from "../../hooks/useMutateAuth";
import { hiroshimas } from "../../../data/hiroshima";
import { string } from "zod";

type Zipcode = {
  main: string;
  sub: string;
};
type Address = {
  address1: string;
  address2: string;
  address3: string;
};

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  familyName: string;
  givenName: string;
  displayName: string;
  place1: number;
  place2: number;
}

const SignUp: React.FC = () => {
  const [zipcode, setZipcodeMain] = useState<Zipcode>({
    main: "",
    sub: "",
  });
  const [address, setAddress] = useState<Address>({
    address1: "",
    address2: "",
    address3: "",
  });

  const updateZipcodeMain = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ main: e.target.value, sub: "" });
    setAddress({
      address1: "",
      address2: "",
      address3: "",
    });
  };
  const updateZipcodeSub = async (e: ChangeEvent<HTMLInputElement>) => {
    setZipcodeMain({ ...zipcode, sub: e.target.value });
    setAddress({
      address1: "",
      address2: "",
      address3: "",
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
          });
        }
      } catch {
        alert("住所の取得に失敗しました。");
      }
    }
  };

  const { isLogin, setLogin } = useLoginContext();
  const router = useRouter();
  const { signUpMutation, loginMutation } = useMutateAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onChange",
    resolver: zodResolver(validationSignupSchema),
  });

  const toId = (place: string) => {
    const split = place.split(/(市|町)/);
    const agreement = hiroshimas.filter(
      (hirosima) => hirosima.name.indexOf(split[0]) === 0
    );
    return agreement[0].id;
  };

  const onSubmit = async (data: SignUpForm) => {
    console.log(data);

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
              <input
                id="familyName"
                type="familyName"
                {...register("familyName")}
                placeholder="familyName  (例：山田)"
                className="
              w-full
              rounded-md
              border
              bordder-[#E9EDF4]
              py-3
              px-5
              bg-[#FCFDFE]
              text-base text-body-color
              placeholder-[#ACB6BE]
              outline-none
              focus-visible:shadow-none
              focus:border-primary"
              />
              <p className="text-rose-600">
                {errors.familyName?.message
                  ? (("※" + errors.familyName?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <input
                id="givenName"
                type="givenName"
                {...register("givenName")}
                placeholder="givenName  (例：太郎)"
                className="
              w-full
              rounded-md
              border
              bordder-[#E9EDF4]
              py-3
              px-5
              bg-[#FCFDFE]
              text-base text-body-color
              placeholder-[#ACB6BE]
              outline-none
              focus-visible:shadow-none
              focus:border-primary"
              />
              <p className="text-rose-600">
                {errors.givenName?.message
                  ? (("※" + errors.givenName?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <input
                id="displayName"
                type="displayName"
                {...register("displayName")}
                placeholder="displayName  (ニックネーム)"
                className="
              w-full
              rounded-md
              border
              bordder-[#E9EDF4]
              py-3
              px-5
              bg-[#FCFDFE]
              text-base text-body-color
              placeholder-[#ACB6BE]
              outline-none
              focus-visible:shadow-none
              focus:border-primary"
              />
            </div>

            <div className="mb-6">
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email"
                className="
              w-full
              rounded-md
              border
              bordder-[#E9EDF4]
              py-3
              px-5
              bg-[#FCFDFE]
              text-base text-body-color
              placeholder-[#ACB6BE]
              outline-none
              focus-visible:shadow-none
              focus:border-primary"
              />
              <p className="text-rose-600">
                {errors.email?.message
                  ? (("※" + errors.email?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="password"
                className="
                w-full
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary"
              />
              <p className="text-rose-600">
                {errors.password?.message
                  ? (("※" + errors.password?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div>
              <div className="flex justify-start items-center">
                <span>〒</span>
                <input
                  id="place1"
                  type="number"
                  {...register("place1")}
                  className="
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={updateZipcodeMain}
                  value={zipcode.main}
                />
                <span>-</span>
                <input
                  id="place2"
                  type="number"
                  {...register("place2")}
                  className="
                        rounded-md
                        border
                        bordder-[#E9EDF4]
                        py-3
                        bg-[#FCFDFE]
                        text-base text-body-color
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

            <div className="py-4">
              <p>郵便番号による住所</p>
              <div>
                <p>都道府県： {address.address1}</p>
                <p>市区町村： {address.address2}</p>
                <p>町域： {address.address3}</p>
              </div>
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
