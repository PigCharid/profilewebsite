import React from "react";

const MyButton = () => {
  return (
    <div className="relative">
      <div
        className="bg-black text-[#caff04] py-3 px-4 text-[20px] relative flex items-center top-[-5px] left-[-5px] hover:left-0 hover:top-0 
                rounded-[12px] z-[2] transition-all duration-100 ease-linear cursor-pointer NormalFont font-bold
              "
      >
        About Me
      </div>
      <span className="absolute w-full h-full bg-white rounded-[14px] border-[3px] border-black top-0 left-0"></span>
    </div>
  );
};

export default MyButton;
