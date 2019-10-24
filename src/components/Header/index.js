import React from "react";

import styles from "./header.module.css";

import Navigate from "../Navigate";
import Basket from "../../icons/Basket";
import Star from "../../icons/Star";
import Search from "../../icons/Search";
import Pinterest from "../../icons/Pinterest";
import Facebook from "../../icons/Facebook";
import Twitter from "../../icons/Twitter";
import Instagram from "../../icons/Instagram";

const Header = () => (
  <div className={styles.wrapper}>
    <div className={styles.section}>
      <div className={styles.btnClosed} />
      <div className={styles.logo}>
        <img src="./img/logo-black.png" alt="logotype image" />
      </div>
      <Navigate className={styles} />
      <div className={styles.btnItem}>
        <div className={styles.btnIcon}>
          <Basket />
        </div>
        Cart
        <span className={styles.count}>(0)</span>
      </div>
      <div className={styles.btnItem}>
        <div className={styles.btnIcon}>
          <Star />
        </div>
        Favorite
      </div>
      <div className={styles.btnItem}>
        <div className={styles.btnIcon}>
          <Search />
        </div>
        Search
      </div>
      <SocialLinks />
    </div>
    <div className={styles.section}>
      <img
        className={styles.logoMobil}
        src="./img/logo-black.png"
        alt="logotype image"
      />
      <div className={styles.btnMenu} />
    </div>
  </div>
);

const socialArr = [
  {
    name: "pinterest",
    href: "http://pinterest.com",
    component: <Pinterest />
  },
  {
    name: "facebook",
    href: "http://facebook.com",
    component: <Facebook />
  },
  {
    name: "twitter",
    href: "http://twitter.com",
    component: <Twitter />
  },
  {
    name: "instagram",
    href: "https://www.instagram.com",
    component: <Instagram />
  }
];

const SocialLinks = () => (
  <div className={styles.social}>
    {socialArr.map(({ name, component, href }) => (
      <a key={name} className={styles.socialLink} href={href} target="_blank">
        {component}
      </a>
    ))}
  </div>
);

export default Header;
