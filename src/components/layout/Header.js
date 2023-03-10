import Button from "components/button/Button";
import ErrorComponent from "components/common/ErrorComponent";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, NavLink } from "react-router-dom";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/#",
    title: "Blog",
  },
  {
    url: "/#",
    title: "Contact",
  },
];
function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();
  return (
    <div className="py-5">
      <div className="layout-container">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-10">
            <Link to="/">
              <img srcSet="./logo-header.png" alt="logo" />
            </Link>
            <ul className="items-center hidden text-lg font-medium list-none lg:flex gap-x-10">
              {menuLinks.map((item) => (
                <li key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              to="/login"
              kind="secondary"
              className="w-[150px] lg:w-[200px] h-12 lg:h-[60px]"
            >
              Login
            </Button>
          ) : (
            <div className="flex items-center justify-end flex-1 gap-x-5">
              <div className="hidden text-base lg:block">
                <span>Welcome back, </span>
                <strong className="text-primary">
                  {getLastName(userInfo?.displayName)}
                </strong>
              </div>
              <Button
                type="button"
                to="/dashboard"
                kind="secondary"
                className="w-[150px] lg:w-[200px] h-12 lg:h-[60px]"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(Header, { FallbackComponent: ErrorComponent });
