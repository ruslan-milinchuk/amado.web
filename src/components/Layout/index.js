import React, { Component } from "react";
import c from "./layout.module.css";
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
      <div className={c.wrapper}>
        {children}
        <a href="#" className={c.scroll_top}>
          <TriangleTop />
        </a>
      </div>
    );
  }
}
export default Layout;
