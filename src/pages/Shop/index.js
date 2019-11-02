import React, { Component } from "react";
import styles from "./shop.module.css";
import { connect } from "react-redux";
import {
  getDataFilter,
  getActiveList,
  startActiveProduct,
  changeStateIsPopular,
  changeViewStatus,
  clickControlLeft,
  clickControlRight
} from "../../action/shop";
import { addToCart } from "../../action/cart";
import Loading from "../../components/Loading";
import {
  MIN_VIEW_SHOP,
  AVERAGE_VIEW_SHOP,
  MAX_VIEW_SHOP
} from "../../constants";
import TriangleTop from "../../icons/TriangleTop";
import Basket from "../../icons/Basket";

class Shop extends Component {
  componentDidMount() {
    const { getDataFilter, startActiveProduct } = this.props;
    getDataFilter();
    startActiveProduct();
  }

  render() {
    const {
      shop,
      getActiveList,
      changeStateIsPopular,
      changeViewStatus,
      clickControlLeft,
      clickControlRight,
      addToCart,
      cartList
    } = this.props;
    const { viewOpen, types, listProduct, isPopular, view, activeType } = shop;
    if (!listProduct.length) {
      return <Loading />;
    }
    return (
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <div className={styles.type}>
            <ListTypes
              types={types}
              getActiveList={getActiveList}
              activeType={activeType}
            />
          </div>
          <div className={isPopular} onClick={changeStateIsPopular}>
            <h3 className={styles.typeTitle}>Popular</h3>
            <p
              className={
                isPopular
                  ? `${styles.popularItem} ${styles.popularActive}`
                  : `${styles.popularItem}`
              }
            >
              Show popular
            </p>
          </div>
          <div className={styles.color}></div>
        </div>
        <div className={styles.products}>
          <div className={styles.sort}>
            <div className={styles.price}></div>
            <div className={styles.view}>
              <h4 className={styles.viewTitle}>View</h4>
              <h4 className={styles.viewQty}>{view}</h4>

              <div className={styles.viewQty}>
                <DropDown
                  view={view}
                  activeType={activeType}
                  getActiveList={getActiveList}
                  viewOpen={viewOpen}
                />
              </div>
              <div
                onClick={changeViewStatus}
                className={
                  viewOpen
                    ? `${styles.viewControl} ${styles.viewControlOpen}`
                    : `${styles.viewControl}`
                }
              >
                <TriangleTop />
              </div>
            </div>
          </div>
          <CartList
            cartList={cartList}
            listProduct={listProduct}
            addToCart={addToCart}
          />
          <div className={styles.control}>
            <div className={styles.controlLeft} onClick={clickControlLeft}>
              <TriangleTop />
            </div>
            <div className={styles.controlRight} onClick={clickControlRight}>
              <TriangleTop />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ListTypes = ({ types, getActiveList, activeType }) => {
  return (
    <ul className={styles.listType}>
      <h3 className={styles.typeTitle}>Categories</h3>
      {types.map((item, index) => (
        <li
          onClick={() => getActiveList(item)}
          className={
            activeType === item
              ? `${styles.typeItemActive} ${styles.typeItem}`
              : `${styles.typeItem}`
          }
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

const CartList = ({ listProduct, addToCart, cartList }) => {
  if (!listProduct.length) {
    return <Loading />;
  }
  return (
    <div className={styles.cartList}>
      {listProduct.map(({ title, price, slider, id }, index) => (
        <div key={index} className={styles.item}>
          <div className={`${styles.inner} ${styles.correlationHeight}`}>
            <div className={styles.content}>
              <img className={styles.img} src={slider[0].large} alt="product" />
            </div>
          </div>
          <div className={styles.imgData}>
            <p className={styles.price}>{price}</p>
            <h4 className={styles.title}>{title}</h4>
            <div
              onClick={() => addToCart(id, slider[1], title, price)}
              className={
                cartList[id]
                  ? `${styles.basketActive} ${styles.basket}`
                  : `${styles.basket}`
              }
            >
              <Basket />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const listDropDown = [MIN_VIEW_SHOP, AVERAGE_VIEW_SHOP, MAX_VIEW_SHOP];
const DropDown = ({ viewOpen, view, getActiveList, activeType }) => {
  return (
    <div
      className={
        !viewOpen ? `${styles.dropDownListClose}` : `${styles.dropDownList}`
      }
    >
      {listDropDown.map((item, index) => (
        <p
          className={view === item && styles.viewActive}
          onClick={() => getActiveList(activeType, item)}
          key={index}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const ShopWithFilter = connect(
  ({ shop, cart }) => ({
    shop,
    cartList: cart.cartList
  }),
  {
    getDataFilter,
    getActiveList,
    startActiveProduct,
    changeStateIsPopular,
    changeViewStatus,
    clickControlLeft,
    addToCart,
    clickControlRight
  }
)(Shop);

export default ShopWithFilter;
