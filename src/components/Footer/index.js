import React from "react";
import Nav from "../Nav";

import style from "./footer.module.css";

const Footer = () => (
  <div className={style.wrapper}>
    <div className={style.content}>
      <div className={style.date}>
        <img src="./img/logo-white.png" alt="logotype" className={style.logo} />
        <p className={style.description}>
          Copyright © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
      <div className={style.navigate}>
        <Nav className={style} />
      </div>
    </div>
  </div>
);

export default Footer;
