import Layout from "layouts/Layout";
import HomeBanner from "modules/home/HomeBanner";
import HomeFeature from "modules/home/HomeFeature";
import HomeLatest from "modules/home/HomeLatest";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeLatest></HomeLatest>
    </div>
  );
};

export default HomePage;
