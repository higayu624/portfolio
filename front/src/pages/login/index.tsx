import { useForm } from "react-hook-form";
import { validationLoginSchema } from "../../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutateAuth } from "../../hooks/useMutateAuth";

interface LoginForm {
  mail_address: string;
  pass: string;
}

const Login: React.FC = () => {
  const { loginMutation } = useMutateAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationLoginSchema),
  });

  const submitAuthHandler = async (data: LoginForm) => {
    console.log("Submit");
    loginMutation.mutate({
      mail_address: data.mail_address,
      pass: data.pass,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-4 ms:flex-col">
        <div className="w-11/12 max-w-lg max-full">
          <div className="flex items-center justify-center py-3 bg-gray-100 font-bold mb-6">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit(submitAuthHandler)} className="grid">
            <div className="mb-6">
              <input
                id="email"
                type="email"
                {...register("mail_address")}
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
                {errors.mail_address?.message
                  ? (("※" + errors.mail_address?.message) as React.ReactNode)
                  : ""}
              </p>
            </div>

            <div className="mb-6">
              <input
                id="password"
                type="password"
                {...register("pass")}
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

export default Login;
