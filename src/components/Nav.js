import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const navigateList = [
  { url: "/", name: "home" },
  { url: "/shop", name: "shop" },
  { url: "/cart", name: "cart" }
];

const Nav = ({ className }) => {
  return (
    <ul className={className.navigate}>
      {navigateList.map((item, index) => (
        <Link to={`${item.url}`} key={index} className={className.item}>
          {item.name}
        </Link>
      ))}
    </ul>
  );
};

export default withRouter(Nav);
