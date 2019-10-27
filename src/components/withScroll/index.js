import React, { Component } from "react";

const withScroll = ComposedComponent =>
  class ScrollDecorator extends Component {
    state = {
      scrollPosition: this.getWindowScrollTop()
    };

    componentWillMount() {
      const INTERVAL = 20;
      this.intervalID = setInterval(this.handleInterval, INTERVAL);
    }

    componentWillUnmount() {
      clearInterval(this.intervalID);
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
      this.intervalID = null;
    }

    getWindowScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }

    handleInterval = () => {
      cancelAnimationFrame(this.requestID);
      this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
    };

    handleRequestAnimationFrame = () => {
      const { scrollPosition } = this.state;
      const newScrollPosition = this.getWindowScrollTop();

      if (newScrollPosition !== scrollPosition) {
        this.setState({
          scrollPosition: newScrollPosition
        });
      }
    };

    render() {
      const { scrollPosition } = this.state;

      return (
        <ComposedComponent {...this.props} scrollPosition={scrollPosition} />
      );
    }
  };

export default withScroll;
