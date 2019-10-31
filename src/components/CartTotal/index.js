import React from "react";
import { withRouter } from "react-router";
import { Field } from "redux-form";
import styles from "./cart-total.module.css";
import Visa from "../../icons/Visa";
import MasterCard from "../../icons/MasterCard";

const CartTotal = ({ subtotal, total, delivery, checkout, history }) => {
  return (
    <div className={styles.info}>
      <h5 className={styles.infoTitle}>cart total</h5>
      <div>
        <div className={styles.infoItem}>
          <p>subtotal:</p>
          <p>${subtotal}</p>
        </div>
        <div className={styles.infoItem}>
          <p>delivery:</p>
          <p>${delivery}</p>
        </div>
        <div className={styles.infoItem}>
          <p>total:</p>
          <p>${total}</p>
        </div>
        {checkout ? <CheckBox /> : null}
      </div>
      <div
        onClick={() => history.push("/checkout") && !checkout}
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

export default withRouter(CartTotal);
