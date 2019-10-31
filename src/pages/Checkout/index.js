import React, { Component } from "react";

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
  IS_MAX_LENGTH,
  MAX_LENGTH_SYMBOL,
  REQUIRED_FIELD,
  SELECT,
  TEXTAREA
} from "../../constants";
import { connect } from "react-redux";

import { cartTotal } from "../../utils/cartTotal";

const Checkout = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Checkout</h2>
      <ReduxFormWithList onSubmit={onSubmit} />
    </div>
  );
};

const onSubmit = formData => {};

const maxLength = maxLengthCreator(MAX_LENGTH_SYMBOL);

const Form = props => {
  const { handleSubmit, cartList, history } = props;
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        {inputsData.map(
          ({ name, type, component, placeholder, className }, index) => (
            <div
              key={index}
              className={`${styles.fieldWrapper} ${styles[name]}`}
            >
              <Field
                className={`${styles.field} ${styles[component]}`}
                name={name}
                type={type}
                component={
                  (component === INPUT && Input) ||
                  (component === TEXTAREA && TextArea) ||
                  (component === SELECT && SelectedSetList) ||
                  component
                }
                placeholder={placeholder}
                validate={
                  name === COMMENT || name === EMAIL || name === COMPANY
                    ? [maxLength]
                    : [maxLength, requiredField]
                }
              />
            </div>
          )
        )}
        <label className={styles.label} htmlFor="create-account">
          <Field
            className={styles.checkbox}
            id="create-account"
            type="checkbox"
            name="create-account"
            component="input"
          />
          <i />
          Create an accout
        </label>
        <label className={styles.label} htmlFor="ship-address">
          <Field
            className={styles.checkbox}
            id="ship-address"
            type="checkbox"
            name="ship-address"
            component="input"
          />
          <i />
          Ship to a different address
        </label>
      </div>
      <CartTotal
        subtotal={cartTotal(cartList).subtotal.toFixed(2)}
        total={cartTotal(cartList).total.toFixed(2)}
        delivery={DELIVERY}
        checkout={true}
        history={history}
      />
    </form>
  );
};

const Input = ({ input, meta, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <input {...input} {...props} />
      <span
        className={
          (meta.error === REQUIRED_FIELD && meta.touched) ||
          meta.error === IS_MAX_LENGTH
            ? `${styles.errorTrue}`
            : `${styles.errorFalse}`
        }
      >
        {meta.error}
      </span>
    </div>
  );
};

const TextArea = ({ input, meta, ...props }) => {
  const hasError = meta.error;
  return (
    <div className={styles.inputWrapper}>
      <textarea {...input} {...props} />
      <span
        className={hasError ? `${styles.errorTrue}` : `${styles.errorFalse}`}
      >
        {meta.error}
      </span>
    </div>
  );
};

class Select extends Component {
  componentDidMount() {
    const { setCountryList } = this.props;
    setCountryList();
  }

  render() {
    const { countriesList, input, meta, ...props } = this.props;
    return (
      <select {...props} {...input}>
        {countriesList.map(({ name, id }) => (
          <option key={id} name={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    );
  }
}

const inputsData = [
  {
    name: "name",
    placeholder: "First Name",
    component: "input",
    type: "text",
    className: `${styles.field} ${styles.name}`
  },
  {
    name: "surname",
    placeholder: "Last Name",
    component: "input",
    type: "text",
    className: `${styles.surname} ${styles.field}`
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
    name: "town",
    placeholder: "Town",
    component: "input",
    type: "text",
    className: styles.field
  },
  {
    name: "code",
    placeholder: "Zip Code",
    component: "input",
    type: "text",
    className: styles.code
  },
  {
    name: "phone",
    placeholder: "Phone No",
    component: "input",
    type: "number",
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

const SelectedSetList = connect(
  ({ checkout }) => ({ countriesList: checkout.countriesList }),
  { setCountryList }
)(Select);

const ReduxForm = reduxForm({ form: "checkout" })(Form);

const ReduxFormWithList = connect(
  ({ cart }) => ({
    cartList: cart.cartList
  }),
  {}
)(ReduxForm);

export default Checkout;
