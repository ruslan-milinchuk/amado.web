import React from "react";

import styles from "./checkout.module.css";
import { Field, reduxForm } from "redux-form";
import CartTotal from "../../components/CartTotal";

const Checkout = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Checkout</h2>
      <ReduxCheckoutForm onSubmit={onSubmit} />
    </div>
  );
};

const onSubmit = formData => {
  console.log("form data", formData);
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
    name: "us",
    placeholder: "United States",
    component: "input",
    type: "text",
    className: styles.field
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

const CheckoutForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        {inputsData.map(
          ({ name, type, component, placeholder, className }, index) => (
            <div className={`${styles.fieldWrapper} ${styles[name]}`}>
              <Field
                className={`${styles.field} ${styles[component]}`}
                key={index}
                name={name}
                type={type}
                component={component}
                placeholder={placeholder}
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
      <CartTotal checkout={true} />
    </form>
  );
};

const ReduxCheckoutForm = reduxForm({ form: "checkout" })(CheckoutForm);

export default Checkout;
