import React, { Component } from "react";
import styles from "./cart.module.css";
import { connect } from "react-redux";
import { changeQtyProduct } from "../../action/cart";
import {
  CHANGE_QTY_PRODUCT_CART_DOWN,
  CHANGE_QTY_PRODUCT_CART_UP,
  DELIVERY
} from "../../constants";

class Cart extends Component {
  render() {
    const { cartList, changeQtyProduct } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.selectedCart}>
          <h2 className={styles.title}>Shopping Cart</h2>
          <div className={styles.categoryList}>
            <h4 className={styles.categoryItem} />
            <h4 className={styles.categoryItem}>name</h4>
            <h4 className={styles.categoryItem}>price</h4>
            <h4 className={styles.categoryItem}>quantity</h4>
          </div>
          <CartList cartList={cartList} changeQtyProduct={changeQtyProduct} />
        </div>
        <div className={styles.info}>
          <h5 className={styles.infoTitle}>cart total</h5>
          <div>
            <div className={styles.infoItem}>
              <p>subtotal:</p>
              <p>${cartTotal(cartList).subtotal.toFixed(2)}</p>
            </div>
            <div className={styles.infoItem}>
              <p>delivery:</p>
              <p>${DELIVERY}</p>
            </div>
            <div className={styles.infoItem}>
              <p>total:</p>
              <p>${cartTotal(cartList).total.toFixed(2)}</p>
            </div>
          </div>
          <div className={styles.btn}>Checkout</div>
        </div>
      </div>
    );
  }
}

const CartList = ({ cartList, changeQtyProduct }) =>
  Object.values(cartList).map(item => (
    <div key={item.id} className={styles.cartWrapper}>
      <div className={styles.cartItem}>
        <div className={`${styles.inner} ${styles.correlationHeight}`}>
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

const cartTotal = cartList => {
  let cartTotal = { subtotal: 0, total: 0 };
  cartTotal.subtotal = Object.values(cartList).reduce(function(sum, current) {
    return sum + current.price * current.qty;
  }, 0);
  cartTotal.total = cartTotal.subtotal + DELIVERY;
  return cartTotal;
};

export default connect(
  ({ cart }) => ({ cartList: cart.cartList }),
  {
    changeQtyProduct
  }
)(Cart);
