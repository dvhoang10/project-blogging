import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default HomeLayout;
