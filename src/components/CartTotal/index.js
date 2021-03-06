import React from "react";
import { withRouter } from "react-router";
import styles from "./cart-total.module.css";

const CartTotal = ({ subtotal, total, delivery, checkout, history }) => (
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
    </div>
    <button
      onClick={() => history.push("/checkout") && !checkout}
      className={styles.btn}
    >
      Checkout
    </button>
  </div>
);

export default withRouter(CartTotal);
