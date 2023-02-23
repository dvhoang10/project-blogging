import Layout from "layouts/Layout";
import HomeBanner from "modules/home/HomeBanner";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <HomeBanner></HomeBanner>
      </Layout>
    </div>
  );
};

export default HomePage;
