import React from "react";
import Navigate from "../Navigate";

import c from "./footer.module.css";

const Footer = () => (
  <div className={c.wrapper}>
    <div className={c.section}>
      <div className={c.info}>
        <h3 className={c.title}>
          Subscribe for a <span className={c.title_color}>25% Discount</span>
        </h3>
        <p className={c.subtitle}>
          Nulla ac convallis lorem, eget euismod nisl. Donec in libero sit amet
          mi vulputate consectetur. Donec auctor interdum purus, ac finibus
          massa bibendum nec.
        </p>
      </div>
      <form action="#" method="post" className={c.form}>
        <input
          type="email"
          name="email"
          className={c.email}
          placeholder="Your E-mail"
        />
        <input className={c.submit} type="submit" value="Subscribe" />
      </form>
    </div>
    <div className={c.section}>
      <div className={c.date}>
        <img src="./img/logo-2.png" alt="image logotype" className={c.logo} />
        <p className={c.description}>
          Copyright © All rights reserved | This template is made with
          <i className={c.icon_heart} />
          {"by "}
          <a className={c.link} href="https://colorlib.com" target="blank">
            Colorlib
          </a>
        </p>
      </div>
      <div className={c.navigate}>
        <Navigate className={c} />
      </div>
      <div className={c.btn} />
    </div>
  </div>
);

export default Footer;
