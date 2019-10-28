import React, { Component } from "react";
import { connect } from "react-redux";
import {
  enterQtyProductInDetails,
  getProductsDetailsCart
} from "../../action/cart";

class Cart extends Component {
  componentDidMount() {
    const { enterQtyProductInDetails, getProductsDetailsCart } = this.props;
    enterQtyProductInDetails("");
    getProductsDetailsCart();
  }

  render() {
    return <div />;
  }
}

export default connect(
  ({ cart }) => ({
    cartInfo: cart
  }),
  {
    enterQtyProductInDetails,
    getProductsDetailsCart
  }
)(Cart);
