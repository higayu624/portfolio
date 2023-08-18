import React from "react";

export const SocialIcons = ({ Icons }: any) => {
  return (
    <div className="text-teal-500">
      {Icons.map((icon: any) => (
        <span
          key={icon.name}
          className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 duration-300"
        ></span>
      ))}
    </div>
  );
};

export default SocialIcons;
