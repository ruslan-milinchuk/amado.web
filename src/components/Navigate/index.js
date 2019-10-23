import React from "react";

const navigateList = ["home", "shop", "product", "cart", "checkout"];

const Navigate = ({ className }) => (
  <ul className={className.navigate}>
    {navigateList.map(item => (
      <li className={className.item}>{item}</li>
    ))}
  </ul>
);

export default Navigate;
