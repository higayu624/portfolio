import { useForm } from "react-hook-form";
import { validationLoginSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormWithZod } from "../InputFormWithZod";

type LoginForm = {
  mail_address: string;
  pass: string;
};

export const LoginForm = (props: { submitAuthHandler: any }) => {
  //zod validation parameter setting
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationLoginSchema),
  });
  return (
    <>
      <div className="flex items-center justify-center space-x-4 ms:flex-col">
        <div className="w-11/12 max-w-lg max-full">
          <div className="flex items-center justify-center py-3 bg-gray-100 font-bold mb-6">
            <h1>Login</h1>
          </div>
          <form
            onSubmit={handleSubmit(props.submitAuthHandler)}
            className="grid"
          >
            <div className="mb-6">
              <InputFormWithZod
                register={register}
                id={"mail_address"}
              ></InputFormWithZod>
              <p className="text-rose-600">
                {errors.mail_address?.message
                  ? (("※" + errors.mail_address?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <InputFormWithZod
                register={register}
                id={"pass"}
              ></InputFormWithZod>
              <p className="text-rose-600">
                {errors.pass?.message
                  ? (("※" + errors.pass?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <button type="submit" className="font-bold border">
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
