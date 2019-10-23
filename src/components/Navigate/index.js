import React from "react";

const navigateList = ["home", "shop", "cart"];

const Navigate = ({ className }) => (
  <ul className={className.navigate}>
    {navigateList.map(item => (
      <li className={className.item}>{item}</li>
    ))}
  </ul>
);

export default Navigate;
