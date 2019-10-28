import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import style from "./layout.module.css";
import TriangleTop from "../../icons/TriangleTop";
import withScroll from "../withScroll";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { enterQtyProductInDetails } from "../../action/cart";
class Layout extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { scrollPosition } = this.props;
    const { children } = this.props;
    return (
      <div className={style.wrapper}>
        {children}
        <div
          className={
            scrollPosition > 300 ? `${style.scrollTop}` : `${style.dislayNone}`
          }
          onClick={() => scroll.scrollToTop()}
        >
          <TriangleTop />
        </div>
      </div>
    );
  }
}

const LayoutScroll = withScroll(Layout);
const LayoutScrollWithLocation = withRouter(LayoutScroll);
export default connect(
  ({ cart }) => ({
    cartInfo: cart
  }),
  {
    enterQtyProductInDetails
  }
)(LayoutScrollWithLocation);
