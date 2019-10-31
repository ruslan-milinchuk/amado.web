import React, { Component } from "react";
import MaskedInput from "react-text-mask";

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
  MASKED_INPUT,
  MAX_LENGTH_SYMBOL,
  REQUIRED_FIELD,
  SELECT,
  TEXTAREA
} from "../../constants";
import { connect } from "react-redux";

import { cartTotal } from "../../utils/cartTotal";

const Checkout = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>Checkout</h2>
    <ReduxFormWithList onSubmit={onSubmit} />
  </div>
);

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
                  (component === SELECT && CountrySelectSetList) ||
                  (component === MASKED_INPUT && PhoneInput) ||
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

const Input = ({ input, meta, ...props }) => (
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

class CountrySelect extends Component {
  componentDidMount() {
    const { setCountryList } = this.props;
    setCountryList();
  }

  render() {
    const { countriesList, input, meta, ...props } = this.props;
    return (
      <select {...props} {...input}>
        {countriesList.map(({ name, id, code }) => (
          <option key={id} name={name} value={code}>
            {name}
          </option>
        ))}
      </select>
    );
  }
}

const PhoneInput = ({ input, meta, ...props }) => {
  return (
    <div>
      <MaskedInput
        {...input}
        {...props}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/
        ]}
        quide={true}
      />
      <span
        className={
          meta.error === REQUIRED_FIELD && meta.touched
            ? `${styles.errorTrue}`
            : `${styles.errorFalse}`
        }
      >
        {meta.error}
      </span>
    </div>
  );
};

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
    cartList: cart.cartList
  }),
  {}
)(ReduxForm);

export default Checkout;
