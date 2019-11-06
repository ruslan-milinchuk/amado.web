import React, { Component } from "react";
import styles from "./cart.module.css";
import cx from "classnames";
import { connect } from "react-redux";
import { changeQtyProduct, setCartTotal } from "../../action/cart";
import {
  CHANGE_QTY_PRODUCT_CART_DOWN,
  CHANGE_QTY_PRODUCT_CART_UP,
  DELIVERY
} from "../../constants";
import CartTotal from "../../components/CartTotal";
import { isEmpty } from "../../utils/isEmpty";
import { cartTotal } from "../../utils/cartTotal";

class Cart extends Component {
  render() {
    const { cartList, changeQtyProduct, history } = this.props;
    if (isEmpty(cartList)) {
      return <h3 className={styles.noList}>No items in cart.</h3>;
    }
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <div className={styles.container}>
          <div className={styles.selectedCart}>
            <div className={styles.categoryList}>
              <h4 className={styles.categoryItem}>foto</h4>
              <h4 className={styles.categoryItem}>name</h4>
              <h4 className={styles.categoryItem}>price</h4>
              <h4 className={styles.categoryItem}>quantity</h4>
            </div>
            <CartList changeQtyProduct={changeQtyProduct} cartList={cartList} />
          </div>
          <CartTotal
            subtotal={cartTotal(cartList).subtotal.toFixed(2)}
            total={cartTotal(cartList).total.toFixed(2)}
            delivery={DELIVERY}
            checkout={false}
            history={history}
            setCartTotal={setCartTotal}
          />
        </div>
      </div>
    );
  }
}

const CartList = ({ cartList, changeQtyProduct }) =>
  Object.values(cartList).map(item => (
    <div key={item.id} className={styles.cartWrapper}>
      <div className={styles.cartItem}>
        <div className={cx(styles.inner, styles.correlationHeight)}>
          <div className={styles.content}>
            <img
              className={styles.cartImg}
              src={item.img.small}
              alt="product"
            />
          </div>
        </div>
      </div>

      <div className={styles.cartInfo}>
        <h4 className={styles.cartCategory}>{item.title}</h4>
        <h4 className={styles.cartCategory}>${item.price}</h4>
        <div className={styles.cartQty}>
          <span>Qty</span>
          <span
            className={styles.qtyControl}
            onClick={() => changeQtyProduct(CHANGE_QTY_PRODUCT_CART_DOWN, item)}
          >
            -
          </span>
          <span>{item.qty}</span>
          <span
            className={styles.qtyControl}
            onClick={() => changeQtyProduct(CHANGE_QTY_PRODUCT_CART_UP, item)}
          >
            +
          </span>
        </div>
      </div>
    </div>
  ));

const CartWithList = connect(
  ({ cart }) => ({ cartList: cart.cartList }),
  {
    changeQtyProduct,
    setCartTotal
  }
)(Cart);
export default CartWithList;
