import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import cx from "classnames";
import styles from "./checkout.module.css";
import { Field, reduxForm } from "redux-form";
import CartTotal from "../../components/CartTotal";

import { setCountryList } from "../../action/checkout";
import { requiredField, maxLengthCreator } from "../../utils/validators";
import {
  COMMENT,
  COMPANY,
  DELIVERY,
  EMAIL,
  INPUT,
  MASK,
  MASKED_INPUT,
  MAX_LENGTH_SYMBOL,
  MAX_LENGTH_SYMBOL_TEXTAREA,
  REQUIRED_FIELD,
  SELECT,
  TEXTAREA
} from "../../constants";
import { connect } from "react-redux";

import { cartTotal } from "../../utils/cartTotal";
import { isMaxLength } from "../../utils/isMaxLength";
import { setCartTotal, clearCartList } from "../../action/cart";
import apiFetch from "../../utils/apiFetch";
import { deleteCartStorage } from "../../utils/deleteCartStorage";
import { withRouter } from "react-router";

const Checkout = ({ cart, clearCartList, history }) => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>Checkout</h2>
    <ReduxFormWithList
      onSubmit={async values => await onSubmit(values, cart, clearCartList)}
      history={history}
    />
  </div>
);

const onSubmit = async (formData, cart, clearCartList) => {
  const { cartList, cartTotal } = cart;
  const product = Object.values(cartList).map(({ qty, price, id }) => {
    return {
      quantity: qty,
      productId: id,
      pricePerOne: price,
      totalPrice: price * qty
    };
  });
  const bill = {
    ...formData,
    ...cartTotal,
    delivery: DELIVERY,
    product: product
  };

  await apiFetch("/bills", {
    method: "POST",
    body: JSON.stringify(bill),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  await deleteCartStorage();
  clearCartList();
};

const maxLength = maxLengthCreator(MAX_LENGTH_SYMBOL);
const maxLengthTextarea = maxLengthCreator(MAX_LENGTH_SYMBOL_TEXTAREA);

class Form extends Component {
  componentDidMount() {
    const { cartList, setCartTotal } = this.props;
    const cartTotalNew = {
      subTotal: cartTotal(cartList).subtotal.toFixed(2),
      total: cartTotal(cartList).total.toFixed(2)
    };
    setCartTotal(cartTotalNew);
  }

  render() {
    const { handleSubmit, cartList, history, postOrderStatus } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputs}>
          {inputsData.map(
            ({ name, type, component, placeholder, className }, index) => (
              <div
                key={index}
                className={cx(styles.fieldWrapper, styles[name])}
              >
                <Field
                  className={cx(styles.field, styles[component])}
                  name={name}
                  type={type}
                  component={
                    (component === INPUT && Input) ||
                    (component === TEXTAREA && TextArea) ||
                    (component === SELECT && CountrySelectSetList) ||
                    (component === MASKED_INPUT && PhoneInput) ||
                    component
                  }
                  placeholder={placeholder}
                  validate={
                    ((name === EMAIL || name === COMPANY) && [maxLength]) ||
                    (name === COMMENT && [maxLengthTextarea]) || [
                      maxLength,
                      requiredField
                    ]
                  }
                />
              </div>
            )
          )}
        </div>
        <CartTotal
          subtotal={cartTotal(cartList).subtotal.toFixed(2)}
          total={cartTotal(cartList).total.toFixed(2)}
          delivery={DELIVERY}
          checkout={true}
          history={history}
        />
        <div
          className={cx(
            { [styles.orderOpenWrapp]: !postOrderStatus },
            {
              [styles.orderShippedWrapp]: postOrderStatus
            }
          )}
        >
          <div className={styles.orderShipped}>
            <p>Thank you for your order. Our manager will contact you</p>
            <div onClick={() => history.push("/")} className={styles.btn}>
              ok
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const checkMaxLength = isMaxLength(MAX_LENGTH_SYMBOL);

const Input = ({ input, meta, ...props }) => (
  <div
    className={cx(styles.inputWrapper, {
      [styles.inputWrapperError]:
        meta.error === checkMaxLength ||
        (meta.error === REQUIRED_FIELD && meta.touched)
    })}
  >
    <input {...input} {...props} />
    <span
      className={cx(styles.errorFalse, {
        [styles.errorTrue]:
          meta.error === checkMaxLength ||
          (meta.error === REQUIRED_FIELD && meta.touched)
      })}
    >
      {meta.error}
    </span>
  </div>
);

const TextArea = ({ input, meta, ...props }) => {
  const hasError = meta.error;
  return (
    <div
      className={cx(styles.inputWrapper, {
        [styles.inputWrapperError]: hasError
      })}
    >
      <textarea {...input} {...props} />
      <span className={cx(styles.errorFalse, { [styles.errorTrue]: hasError })}>
        {meta.error}
      </span>
    </div>
  );
};

class CountrySelect extends Component {
  componentDidMount() {
    const { setCountryList } = this.props;
    setCountryList();
  }
  render() {
    const { countriesList, input, meta, ...props } = this.props;
    return (
      <div
        className={cx(styles.inputWrapper, {
          [styles.inputWrapperError]:
            meta.error === checkMaxLength ||
            (meta.error === REQUIRED_FIELD && meta.touched)
        })}
      >
        <select {...props} {...input}>
          {countriesList.map(({ name, id, code }) => (
            <option key={id} name={name} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const PhoneInput = ({ input, meta, ...props }) => (
  <div
    className={cx(styles.inputWrapper, {
      [styles.inputWrapperError]:
        meta.error === checkMaxLength ||
        (meta.error === REQUIRED_FIELD && meta.touched)
    })}
  >
    <MaskedInput {...input} {...props} mask={MASK} quide={true} />
    <span
      className={cx(styles.errorFalse, {
        [styles.errorTrue]: meta.error === REQUIRED_FIELD && meta.touched
      })}
    >
      {meta.error}
    </span>
  </div>
);

const inputsData = [
  {
    name: "firstName",
    placeholder: "First Name",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "company",
    placeholder: "Company Name",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "email",
    placeholder: "Email",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "country",
    placeholder: "Select your country",
    component: "select",
    type: "text",
    className: styles.select
  },
  {
    name: "address",
    placeholder: "Address",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "city",
    placeholder: "Town",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "zip",
    placeholder: "Zip Code",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "phone",
    placeholder: "Phone No",
    component: "masked-input",
    type: "masked-input",
    className: styles.phone
  },
  {
    name: "comment",
    placeholder: "Leave a comment about your order",
    component: "textarea",
    type: "text",
    className: styles.textarea
  }
];

const CountrySelectSetList = connect(
  ({ checkout }) => ({ countriesList: checkout.countriesList }),
  { setCountryList }
)(CountrySelect);

const ReduxForm = reduxForm({ form: "checkout" })(Form);

const ReduxFormWithList = connect(
  ({ cart }) => ({
    cartList: cart.cartList,
    postOrderStatus: cart.postOrderStatus
  }),
  { setCartTotal }
)(ReduxForm);

const CheckoutWithCart = connect(
  ({ cart }) => ({
    cart
  }),
  { clearCartList }
)(Checkout);

const CheckoutWithCartAndLocation = withRouter(CheckoutWithCart);

export default CheckoutWithCartAndLocation;
