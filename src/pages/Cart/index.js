import React, { Component } from "react";
import { connect } from "react-redux";
import { enterQtyProductInDetails } from "../../action/cart";

class Cart extends Component {
  render() {
    return <div />;
  }
}

export default connect(
  ({ cart }) => ({
    cartInfo: cart
  }),
  {
    enterQtyProductInDetails
  }
)(Cart);
