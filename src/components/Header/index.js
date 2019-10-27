import React, { Component } from "react";
import { connect } from "react-redux";
import windowSize from "react-window-size";

import styles from "./header.module.css";

import Nav from "../Nav";
import Basket from "../../icons/Basket";
import Star from "../../icons/Star";
import Search from "../../icons/Search";
import Pinterest from "../../icons/Pinterest";
import Facebook from "../../icons/Facebook";
import Twitter from "../../icons/Twitter";
import Instagram from "../../icons/Instagram";

import { changeMenuStatus } from "../../action/header";

class Header extends Component {
  componentDidMount() {
    const { windowWidth, isOpenHeader, changeMenuStatus } = this.props;
    if (windowWidth > 767 && isOpenHeader) {
      changeMenuStatus();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { windowWidth, isOpenHeader, changeMenuStatus } = this.props;
    if (windowWidth !== prevProps.windowWidth) {
      if (windowWidth > 767 && isOpenHeader) {
        changeMenuStatus();
      }
      if (windowWidth <= 767 && !isOpenHeader) {
        changeMenuStatus();
      }
    }
  }

  render() {
    const { isOpenHeader, changeMenuStatus, windowWidth } = this.props;
    return (
      <div className={styles.wrapper} id="headerWrapper">
        <div className={isOpenHeader ? styles.sectionClose : styles.section}>
          <div
            className={
              !isOpenHeader && windowWidth <= 767
                ? styles.openMenu
                : styles.closedMenu
            }
            onClick={changeMenuStatus}
          />
          <div className={styles.btnClosed} onClick={changeMenuStatus} />
          <div className={styles.sectionUnFixed}>
            <div className={styles.logo}>
              <img src="./img/logo-black.png" alt="logotype" />
            </div>
            <Nav className={styles} />
            <BottomNav />
            <SocialLinks />
          </div>
        </div>
        <div className={styles.section}>
          <img
            className={styles.logoMobil}
            src="./img/logo-black.png"
            alt="logotype"
          />
          <div className={styles.btnMenu} onClick={changeMenuStatus} />
        </div>
      </div>
    );
  }
}

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
      <a
        key={name}
        className={styles.socialLink}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {component}
      </a>
    ))}
  </div>
);

const BottomNav = () => (
  <div>
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
  </div>
);

const HeaderCheckSize = windowSize(Header);

export default connect(
  ({ header }) => ({
    isOpenHeader: header
  }),
  { changeMenuStatus }
)(HeaderCheckSize);
