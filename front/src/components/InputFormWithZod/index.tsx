export const InputFormWithZod = (props: { register: any; id: string }) => {
  return (
    <input
      id={props.id}
      type={props.id}
      {...props.register(props.id)}
      placeholder={props.id}
      className="login-form"
    />
  );
};
