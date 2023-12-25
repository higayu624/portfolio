export const PreviousPost = (props: { latestPost: any }) => {
  return (
    <div className="flex flex-col justify-center items-center font-medium">
      <div className="border flex flex-col justify-center items-center rounded-lg  w-4/5 max-w-screen-md">
        <div className="mb-3">前回の投稿</div>
        <div className="grid grid-cols-3 w-4/5 max-w-screen-md">
          <p>タイトル</p>
          <p className="flex justify-center col-span-2 mb-3">
            {props.latestPost.title}
          </p>

          <p>詳細</p>
          <p className="flex justify-center col-span-2 mb-6">
            {props.latestPost.description}
          </p>
        </div>
      </div>
    </div>
  );
};
