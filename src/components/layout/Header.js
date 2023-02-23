import Button from "components/button/Button";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  return (
    <div className="py-5">
      <div className="layout-container">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-10">
            <Link to="/">
              <img srcSet="./logo-header.png" alt="logo" />
            </Link>
            <ul className="flex items-center text-lg font-medium list-none gap-x-10">
              {menuLinks.map((item) => (
                <li key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Button
            type="button"
            to="/login"
            kind="secondary"
            className="w-full max-w-[200px]"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
