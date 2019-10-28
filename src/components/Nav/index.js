import React from "react";
import { withRouter } from "react-router";

const navigateList = ["home", "shop", "cart"];

const Nav = ({ className, history }) => {
  return (
    <ul className={className.navigate}>
      {navigateList.map((item, index) => (
        <li
          key={index}
          className={className.item}
          onClick={() => history.push(item === "home" ? "/" : `/${item}`)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default withRouter(Nav);
