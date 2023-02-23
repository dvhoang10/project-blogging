import Header from "components/layout/Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};

export default Layout;
