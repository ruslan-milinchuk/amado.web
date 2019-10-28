import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./home.module.css";
import { sliceRandomProductList } from "../../action/home";
import Loading from "../../components/Loading";

class Home extends Component {
  componentDidMount() {
    const { sliceRandomProductList } = this.props;
    sliceRandomProductList();
  }

  render() {
    const { homeDetails, history } = this.props;
    const { error, sliceTopProduct, loader } = homeDetails;
    if (loader) {
      return (
        <div className={styles.wrapper}>
          <Loading />
        </div>
      );
    }
    if (error) {
      return <h4>ERROR: {error}</h4>;
    }
    return (
      <div className={styles.wrapper}>
        {sliceTopProduct.map(
          ({ slider = [], title, topImgNumber, id, price }) => (
            <div
              key={id}
              className={styles.item}
              onClick={() => history.push(`/product/${id}`)}
            >
              <div className={`${styles.inner} ${styles.correlationHeight}`}>
                <div className={styles.content}>
                  <div className={styles.info}>
                    <p className={styles.price}>From ${price}</p>
                    <h4 className={styles.title}>From {title}</h4>
                  </div>

                  <img
                    className={styles.img}
                    src={slider[topImgNumber].large}
                    alt={slider[topImgNumber].large}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

const HomeWithLocation = withRouter(Home);

export default connect(
  ({ home }) => ({
    homeDetails: home
  }),
  { sliceRandomProductList }
)(HomeWithLocation);
