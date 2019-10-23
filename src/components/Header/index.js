import React from "react";

import style from "./header.module.css";

const Header = () => (
  <div className={style.wrapper}>
    <div className={style.logo}>
      <img src="./img/logo" alt="" />
    </div>
  </div>
);

export default Header;
