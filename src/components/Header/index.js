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
      <div className={styles.logo}>
        <img src="./img/logo-black.png" alt="logotype image" />
      </div>
      <Navigate className={styles} />
      <div className={styles.btnNewProduct}>New this week</div>
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
      <div className={styles.social}>
        <a className={styles.socialLink} href="#">
          <Pinterest />
        </a>
        <a className={styles.socialLink} href="#">
          <Facebook />
        </a>
        <a className={styles.socialLink} href="#">
          <Twitter />
        </a>
        <a className={styles.socialLink} href="#">
          <Instagram />
        </a>
      </div>
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

export default Header;
