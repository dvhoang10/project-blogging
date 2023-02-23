import Button from "components/button/Button";
import React from "react";

const HomeBanner = () => {
  return (
    <div className="min-h-[520px] py-10 bg-homeBanner mb-10 flex items-center justify-between">
      <div className="layout-container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="max-w-[600px] text-white">
            <h1 className="mb-3 text-3xl font-bold lg:mb-5 lg:text-4xl">
              Blogging App
            </h1>
            <p className="mb-6 leading-7 lg:mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button type="button" to="/" className="w-[200px]" kind="white">
              Get started
            </Button>
          </div>
          <div className="mt-[25px] lg:mt-0">
            <img src="./img-banner.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
