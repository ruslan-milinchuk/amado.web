import React, { Component } from "react";
import styles from "./shop.module.css";
import { connect } from "react-redux";
import { getListProducts } from "../../action/shop";
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
import { stringifySearchParams } from "../../utils/stringifySearchParams";

class Shop extends Component {
  state = {
    dropDownModalStatus: null
  };
  componentDidMount() {
    const { getListProducts, shop } = this.props;
    const { params } = shop;
    getListProducts(params);
  }

  render() {
    const { shop, getListProducts, addToCart, cartList } = this.props;
    const { params, list, controlRightActive } = shop;
    const { _limit, isTop, type, _start, _sort } = params;
    const { dropDownModalStatus } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <div className={styles.type}>
            <ListTypes
              getListProducts={getListProducts}
              type={type}
              params={params}
            />
          </div>
          <div
            onClick={() =>
              getListProducts({
                ...params,
                isTop: isTop ? undefined : true,
                _q: undefined
              })
            }
          >
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
          <FilterColor getListProducts={getListProducts} params={params} />
        </div>
        <div className={styles.products}>
          <div className={styles.sort}>
            <DropDownHeader
              onClick={value =>
                getListProducts({ ...params, _sort: `createdAt:${value}` })
              }
              visible={dropDownModalStatus === "Date"}
              title="Date"
              arr={listDropDownSort}
              changeDropDownState={value =>
                this.setState({
                  dropDownModalStatus: value
                })
              }
              value={
                _sort && _sort.includes("createdAt") && _sort.split(":")[1]
              }
            />
            <DropDownHeader
              onClick={value =>
                getListProducts({ ...params, _sort: `price:${value}` })
              }
              visible={dropDownModalStatus === "Price"}
              title="Price"
              arr={listDropDownSort}
              changeDropDownState={value =>
                this.setState({
                  dropDownModalStatus: value
                })
              }
              value={_sort && _sort.includes("price") && _sort.split(":")[1]}
            />
            <DropDownHeader
              onClick={value => getListProducts({ ...params, _limit: value })}
              visible={dropDownModalStatus === "View"}
              title="View"
              arr={listDropDownView}
              changeDropDownState={value =>
                this.setState({
                  dropDownModalStatus: value
                })
              }
              value={_limit}
            />
          </div>
          <CartList
            list={list}
            params={params}
            addToCart={addToCart}
            cartList={cartList}
          />
          <div className={styles.control}>
            <div
              className={
                !_start
                  ? `${styles.controlLeft} ${styles.controlLeftUnActive}`
                  : `${styles.controlLeft}`
              }
              onClick={() =>
                getListProducts({
                  ...params,
                  _start: _start - parseInt(_limit)
                })
              }
            >
              <TriangleTop />
            </div>
            <div
              className={
                !controlRightActive
                  ? `${styles.controlRight} ${styles.controlRightUnActive}`
                  : `${styles.controlRight}`
              }
              onClick={() =>
                getListProducts({
                  ...params,
                  _start: _start + parseInt(_limit)
                })
              }
            >
              <TriangleTop />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const types = ["all", "chair", "sofa", "storage", "beds", "lamps"];

const ListTypes = ({ getListProducts, type, params }) => {
  return (
    <ul className={styles.listType}>
      <h3 className={styles.typeTitle}>Categories</h3>
      {types.map((item, index) => (
        <li
          onClick={() =>
            getListProducts({
              ...params,
              type: item === "all" ? undefined : item,
              _start: 0,
              _q: undefined
            })
          }
          className={
            type === item || (!type && item === "all")
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

const CartList = ({ list, params, addToCart, cartList }) => {
  if (isEmpty(list) || !list[stringifySearchParams(params)]) {
    return <Loading />;
  }
  const searchList = list[stringifySearchParams(params)];
  return (
    <div className={styles.cartList}>
      {searchList.map(({ title, price, slider, id }, index) => (
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

const DropDownHeader = ({
  title,
  arr,
  changeDropDownState,
  value,
  visible,
  onClick
}) => {
  return (
    <div className={styles.dropMenu} onClick={() => changeDropDownState(title)}>
      <h4 className={styles.dropMenuTitle}>{title}</h4>
      <div className={styles.dropMenuQty}>
        <DropDown
          arr={arr}
          visible={visible}
          onClick={onClick}
          changeDropDownState={changeDropDownState}
        />
      </div>
      <p className={styles.valueDropDown}>{value}</p>
      <div
        className={
          visible
            ? `${styles.dropMenuControl} ${styles.dropMenuControlOpen}`
            : `${styles.dropMenuControl}`
        }
      >
        <TriangleTop />
      </div>
    </div>
  );
};

const DropDown = ({ visible, arr, onClick, changeDropDownState }) => {
  return (
    <div
      className={
        !visible ? `${styles.dropMenuListClose}` : `${styles.dropMenuList}`
      }
    >
      {arr.map((item, index) => (
        <p
          className={styles.dropMenuItem}
          onClick={() => onClick(item)}
          key={index}
        >
          <span
            onClick={e => {
              e.stopPropagation();
              changeDropDownState(null);
            }}
            className={
              visible
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

const FilterColor = ({ getListProducts, params }) => {
  const { _q } = params;
  return (
    <div className={styles.color}>
      {colorList.map((item, index) => (
        <div
          key={index}
          style={{ background: item }}
          className={
            _q === item ? `${styles.filterItemActive}` : `${styles.filterItem}`
          }
          onClick={() =>
            getListProducts({
              ...params,
              _q: item,
              type: undefined,
              isTop: undefined
            })
          }
        />
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
    getListProducts,
    addToCart
  }
)(Shop);

export default ShopWithFilter;
