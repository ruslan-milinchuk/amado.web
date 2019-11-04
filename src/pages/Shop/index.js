import React, { Component } from "react";
import styles from "./shop.module.css";
import { connect } from "react-redux";
import { changeParams, startPage } from "../../action/shop";
import { addToCart } from "../../action/cart";
import Loading from "../../components/Loading";
import {
  MIN_VIEW_SHOP,
  AVERAGE_VIEW_SHOP,
  MAX_VIEW_SHOP
} from "../../constants";
import TriangleTop from "../../icons/TriangleTop";
import Basket from "../../icons/Basket";
import { isEmpty } from "../../utils/isEmpty";
import { Link } from "react-router-dom";

class Shop extends Component {
  state = {
    dropViewIsOpen: false,
    dropDateIsOpen: false,
    dropPriceIsOpen: false,
    valueDropPrice: "",
    valueDropDate: "asc",
    valueDropView: 12
  };
  componentDidMount() {
    const { startPage } = this.props;
    startPage();
  }

  render() {
    const { shop, changeParams, addToCart, cartList } = this.props;
    const { params, list, controlRightActive, controlLeftActive } = shop;
    const { _limit, isTop, type, _start } = params;
    const {
      dropViewIsOpen,
      dropDateIsOpen,
      dropPriceIsOpen,
      valueDropPrice,
      valueDropDate,
      valueDropView
    } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <div className={styles.type}>
            <ListTypes changeParams={changeParams} type={type} />
          </div>
          <div onClick={() => changeParams("isTop", true)}>
            <h3 className={styles.typeTitle}>Popular</h3>
            <p
              className={
                isTop
                  ? `${styles.popularItem} ${styles.popularActive}`
                  : `${styles.popularItem}`
              }
            >
              Show popular
            </p>
          </div>
          <h3 className={styles.typeTitle}>Color</h3>
          <FilterColor changeParams={changeParams} />
        </div>
        <div className={styles.products}>
          <div className={styles.sort}>
            <DropDownHeader
              dropDownIsOpen={dropDateIsOpen}
              title="Date"
              changeParamsValue="createdAt:"
              changeParamsName="_sort"
              arr={listDropDownSort}
              changeDropDownState={this.changeDropDownState}
              changeParams={changeParams}
              valueDropDown={valueDropDate}
              changeValueDropDown={this.changeValueDropDown}
            />
            <DropDownHeader
              dropDownIsOpen={dropPriceIsOpen}
              changeParamsValue="price:"
              changeParamsName="_sort"
              title="Price"
              arr={listDropDownSort}
              changeDropDownState={this.changeDropDownState}
              changeParams={changeParams}
              valueDropDown={valueDropPrice}
              changeValueDropDown={this.changeValueDropDown}
            />
            <DropDownHeader
              dropDownIsOpen={dropViewIsOpen}
              changeParamsValue=""
              changeParamsName="_limit"
              title="View"
              arr={listDropDownView}
              changeDropDownState={this.changeDropDownState}
              changeParams={changeParams}
              valueDropDown={valueDropView}
              changeValueDropDown={this.changeValueDropDown}
            />
          </div>
          <CartList list={list} addToCart={addToCart} cartList={cartList} />
          <div className={styles.control}>
            <div
              className={
                !controlLeftActive
                  ? `${styles.controlLeft} ${styles.controlLeftUnActive}`
                  : `${styles.controlLeft}`
              }
              onClick={() => changeParams("_start", _start - parseInt(_limit))}
            >
              <TriangleTop />
            </div>
            <div
              className={
                !controlRightActive
                  ? `${styles.controlRight} ${styles.controlRightUnActive}`
                  : `${styles.controlRight}`
              }
              onClick={() => changeParams("_start", _start + parseInt(_limit))}
            >
              <TriangleTop />
            </div>
          </div>
        </div>
      </div>
    );
  }

  changeDropDownState = (title, dropDownIsOpen) => {
    if (title === "Price") {
      return this.setState({ dropPriceIsOpen: !dropDownIsOpen });
    }
    if (title === "Date") {
      return this.setState({ dropDateIsOpen: !dropDownIsOpen });
    }
    if (title === "View") {
      return this.setState({ dropViewIsOpen: !dropDownIsOpen });
    }
  };

  changeValueDropDown = (changeParamsValue, item) => {
    console.log("value", changeParamsValue);
    console.log("item", item);
    if (changeParamsValue === "price:") {
      return this.setState({ valueDropPrice: item, valueDropDate: '' });
    }
    if (changeParamsValue === "createdAt:") {
      return this.setState({ valueDropDate: item, valueDropPrice: '' });
    }
    if (changeParamsValue === "") {
      return this.setState({ valueDropView: item });
    }
  };
}

const types = ["chair", "sofa", "storage", "beds", "lamps"];

const ListTypes = ({ changeParams, type }) => {
  return (
    <ul className={styles.listType}>
      <h3 className={styles.typeTitle}>Categories</h3>
      {types.map((item, index) => (
        <li
          onClick={() => changeParams("type", item)}
          className={
            type === item
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

const CartList = ({ list, addToCart, cartList }) => {
  if (list && isEmpty(list)) {
    return <Loading />;
  }
  return (
    <div className={styles.cartList}>
      {Object.values(list)[0].map(({ title, price, slider, id }, index) => (
        <div key={index} className={styles.item}>
          <Link to={`/product/${id}`} className={styles.content}>
            <img className={styles.img} src={slider[0].large} alt="product" />
          </Link>
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

const listDropDownView = [MIN_VIEW_SHOP, AVERAGE_VIEW_SHOP, MAX_VIEW_SHOP];

const listDropDownSort = ["desc", "asc"];

const DropDown = ({
  changeParams,
  dropDownIsOpen,
  arr,
  changeParamsValue,
  changeParamsName,
  changeValueDropDown
}) => {
  return (
    <div
      className={
        !dropDownIsOpen
          ? `${styles.dropDownListClose}`
          : `${styles.dropDownList}`
      }
    >
      {arr.map((item, index) => (
        <p
          className={styles.viewActive}
          onClick={() =>
            changeParams(changeParamsName, `${changeParamsValue}${item}`) &&
            changeValueDropDown(changeParamsValue, item)
          }
          key={index}
        >
          <span
            className={
              dropDownIsOpen
                ? `${styles.closeMenuActive}`
                : `${styles.closeMenuUnactive}`
            }
          />
          {item}
        </p>
      ))}
    </div>
  );
};
const colorList = [
  "white",
  "black",
  "grey",
  "brown",
  "yellow",
  "green",
  "pink",
  "blue"
];
const FilterColor = ({ changeParams }) => {
  return (
    <div className={styles.color}>
      {colorList.map((item, index) => (
        <div
          key={index}
          style={{ background: item }}
          className={styles.filterItem}
          onClick={() => changeParams("_q", item)}
        />
      ))}
    </div>
  );
};

const DropDownHeader = ({
  dropDownIsOpen,
  title,
  arr,
  changeDropDownState,
  changeParams,
  changeParamsValue,
  changeParamsName,
  valueDropDown,
  changeValueDropDown
}) => {
  return (
    <div
      className={styles.view}
      onClick={() => changeDropDownState(title, dropDownIsOpen)}
    >
      <h4 className={styles.viewTitle}>{title}</h4>
      <div className={styles.viewQty}>
        <DropDown
          changeParams={changeParams}
          changeParamsValue={changeParamsValue}
          changeParamsName={changeParamsName}
          changeDropDownState={changeDropDownState}
          dropDownIsOpen={dropDownIsOpen}
          arr={arr}
          title={title}
          changeValueDropDown={changeValueDropDown}
        />
      </div>
      <p className={styles.valueDropDown}>{valueDropDown}</p>
      <div
        className={
          dropDownIsOpen
            ? `${styles.viewControl} ${styles.viewControlOpen}`
            : `${styles.viewControl}`
        }
      >
        <TriangleTop />
      </div>
    </div>
  );
};
const ShopWithFilter = connect(
  ({ shop, cart }) => ({
    shop,
    cartList: cart.cartList
  }),
  {
    changeParams,
    startPage,
    addToCart
  }
)(Shop);

export default ShopWithFilter;
