import React, { Component } from "react";
import { connect } from "react-redux";
import windowSize from "react-window-size";
import { withRouter } from "react-router";
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
import { Link } from "react-router-dom";
import { SIZE_SCREEN_PHONE } from "../../constants";
import { isEmpty } from "../../utils/isEmpty";
import { checkLocalStorage } from "../../action/cart";
import cx from "classnames";
class Header extends Component {
  componentDidMount() {
    const { windowWidth, isOpenHeader, changeMenuStatus } = this.props;
    if (windowWidth > SIZE_SCREEN_PHONE && isOpenHeader) {
      changeMenuStatus();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { windowWidth, isOpenHeader, changeMenuStatus } = this.props;
    if (windowWidth !== prevProps.windowWidth) {
      if (windowWidth > SIZE_SCREEN_PHONE && isOpenHeader) {
        changeMenuStatus();
      }
      if (windowWidth <= SIZE_SCREEN_PHONE && !isOpenHeader) {
        changeMenuStatus();
      }
    }
  }

  render() {
    const { isOpenHeader, changeMenuStatus, windowWidth } = this.props;
    return (
      <div className={styles.wrapper}>
        <div
          className={cx(
            { [styles.sectionClose]: isOpenHeader },
            { [styles.section]: !isOpenHeader }
          )}
        >
          <div
            className={cx(
              {
                [styles.openMenu]:
                  !isOpenHeader && windowWidth <= SIZE_SCREEN_PHONE
              },
              {
                [styles.closedMenu]:
                  !isOpenHeader && windowWidth > SIZE_SCREEN_PHONE
              }
            )}
            onClick={changeMenuStatus}
          />
          <div className={styles.btnClosed} onClick={changeMenuStatus} />
          <div className={styles.sectionUnFixed}>
            <div className={styles.logo}>
              <img src="./img/logo-black.png" alt="logotype" />
            </div>
            <Nav className={styles} />
            <BottomNavWithList />
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

class BottomNav extends Component {
  componentDidMount() {
    const { checkLocalStorage } = this.props;
    checkLocalStorage();
  }

  render() {
    const { cartList } = this.props;

    return (
      <div>
        <Link
          to="/cart"
          className={cx(styles.btnItem, {
            [styles.unactive]: isEmpty(cartList)
          })}
        >
          <div className={styles.btnIcon}>
            <Basket />
          </div>
          Cart
          <span className={styles.count}>
            ({Object.values(cartList).length})
          </span>
        </Link>
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
  }
}

const HeaderCheckSize = windowSize(Header);
const HeaderCheckSizeWithLocation = withRouter(HeaderCheckSize);

const BottomNavWithList = connect(
  ({ cart }) => ({ cartList: cart.cartList }),
  { checkLocalStorage }
)(BottomNav);

export default connect(
  ({ header }) => ({
    isOpenHeader: header
  }),
  { changeMenuStatus }
)(HeaderCheckSizeWithLocation);
