import React, { Component } from "react";
import style from "./layout.module.css";
import TriangleTop from "../../icons/TriangleTop";

class Layout extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className={style.wrapper}>
        {children}
        <a href="#" className={style.scrollTop}>
          <TriangleTop />
        </a>
      </div>
    );
  }
}
export default Layout;
