import React from "react";
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

const navigateList = ["home", "shop", "cart"];

const Nav = ({ className }) => {
  return (
    <ul className={className.navigate}>
      {navigateList.map((item, index) => (
        <Link
          to={item === "home" ? "/" : `/${item}`}
          key={index}
          className={className.item}
        >
          {item}
        </Link>
      ))}
    </ul>
  );
};

export default withRouter(Nav);
