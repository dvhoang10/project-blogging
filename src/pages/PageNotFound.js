import Button from "components/button/Button";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
      <div className="layout-container">
        <div className="w-full mx-auto text-center">
          <img
            src="./404.png"
            alt=""
            className="inline-block mb-10 max-w-[150px] lg:max-w-[250px]"
          />
          <h1 className="text-4xl mb-10 lg:text-[60px] font-semibold">
            404 - Looks like you're lost.
          </h1>
          <p className="mx-auto mb-10 text-sm leading-loose lg:text-base">
            Maybe this page used to exist or you just spelled something wrong.
            Chances are your spelled something wrong, so can you double check
            the URL?
          </p>
          <Button to="/" className="max-w-[200px] mx-auto h-12 lg:h-[60px]">
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
