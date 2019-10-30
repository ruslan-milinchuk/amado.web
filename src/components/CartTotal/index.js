import React from "react";
import { withRouter } from "react-router";
import { Field } from "redux-form";
import styles from "./cart-total.module.css";
import { DELIVERY } from "../../constants";
import { connect } from "react-redux";
import { changeMenuStatus } from "../../action/header";
import Visa from "../../icons/Visa";
import MasterCard from "../../icons/MasterCard";

const CartTotal = ({ cartList, checkout, history }) => {
  return (
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
        {checkout ? <CheckBox /> : null}
      </div>
      <div
        onClick={!checkout ? () => history.push("/checkout") : null}
        className={styles.btn}
      >
        Checkout
      </div>
    </div>
  );
};

const CheckBox = () => (
  <div>
    <label className={styles.label} htmlFor="cash-delivery">
      <Field
        className={styles.checkbox}
        id="cash-delivery"
        type="checkbox"
        name="cash-delivery"
        component="input"
      />
      <i />
      Cash on delivery
    </label>
    <label className={styles.label} htmlFor="paypal">
      <Field
        className={styles.checkbox}
        id="paypal"
        type="checkbox"
        name="paypal"
        component="input"
      />
      <i />
      PayPal
      <Visa />
      <MasterCard />
    </label>
  </div>
);

const cartTotal = cartList => {
  let cartTotal = { subtotal: 0, total: 0 };
  cartTotal.subtotal = Object.values(cartList).reduce(function(sum, current) {
    return sum + current.price * current.qty;
  }, 0);
  cartTotal.total = cartTotal.subtotal + DELIVERY;
  return cartTotal;
};

const CartTotalWithLocation = withRouter(CartTotal);

export default connect(
  ({ cart }) => ({
    cartList: cart.cartList
  }),
  { changeMenuStatus }
)(CartTotalWithLocation);
