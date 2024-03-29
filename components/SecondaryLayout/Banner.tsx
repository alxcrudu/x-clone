import React from "react";

import TwitterX from "../SVG/TwitterX";

const Banner = () => {
  return (
    <div className="relative h-full w-screen md:h-[95vh] md:w-[40vw] lg:w-[65vw]">
      <div className="absolute left-[50%] top-[50%] flex w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center p-5 md:hidden">
        <TwitterX size="2md" color="white" />
      </div>
      <div className="absolute left-[50%] top-[50%] hidden w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center p-5 md:flex lg:hidden">
        <TwitterX size="xl" color="white" />
      </div>
      <div className="absolute left-[50%] top-[50%] hidden w-full translate-x-[-50%] translate-y-[-50%] items-center justify-center p-5 lg:flex">
        <TwitterX size="2xl" color="white" />
      </div>
    </div>
  );
};

export default Banner;
