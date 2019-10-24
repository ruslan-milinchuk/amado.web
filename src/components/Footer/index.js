import React from "react";
import Nav from "../Nav";

import style from "./footer.module.css";

const Footer = () => (
  <div className={style.wrapper}>
    <div className={style.content}>
      <div className={style.date}>
        <img
          src="./img/logo-white.png"
          alt="image logotype"
          className={style.logo}
        />
        <p className={style.description}>
          Copyright © {new Date().getFullYear()} All rights reserved | This
          template is made with
          <i className={style.iconHeart} />
          {"by "}
          <a className={style.link} href="https://colorlib.com" target="_blank">
            Colorlib
          </a>
        </p>
      </div>
      <div className={style.navigate}>
        <Nav className={style} />
      </div>
    </div>
  </div>
);

export default Footer;
