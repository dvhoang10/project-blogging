import Button from "components/button/Button";
import ErrorComponent from "components/common/ErrorComponent";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";

const HomeBanner = () => {
  const { userInfo } = useAuth();
  return (
    <div className="min-h-[520px] py-10 bg-homeBanner mb-10 flex items-center justify-between">
      <div className="layout-container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="max-w-[600px] text-white">
            <h1 className="mb-3 text-3xl font-bold lg:mb-5 lg:text-4xl">
              Discover and share the world’s best photos
            </h1>
            <p className="mb-6 leading-7 lg:mb-10 lg:text-base">
              Get inspired with incredible photos from diverse styles and genres
              around the world. We're not guided by fads—just great photography.
            </p>
            {!userInfo ? (
              <Button
                type="button"
                to="/login"
                className="w-[120px] lg:w-[200px] h-12 lg:h-[60px]"
                kind="white"
              >
                Sign up
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-[25px] lg:mt-0">
            <img src="./img-banner.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(HomeBanner, {
  FallbackComponent: ErrorComponent,
});
