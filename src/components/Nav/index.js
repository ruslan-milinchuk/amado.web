import React from "react";

const navigateList = ["home", "shop", "cart"];

const Nav = ({ className }) => (
  <ul className={className.navigate}>
    {navigateList.map(item => (
      <li className={className.item}>{item}</li>
    ))}
  </ul>
);

export default Nav;
