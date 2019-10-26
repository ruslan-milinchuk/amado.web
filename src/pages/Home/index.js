import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./home.module.css";
import { setTopProductList } from "../../action/home";
import apiFetch from "../../utils/apiFetch";
import Loading from "../../components/Loading";
import { TOP_PRODUCT_LIST_LENGTH } from "../../constants";

class Home extends Component {
  async componentDidMount() {
    const { setTopProductList } = this.props;
    const data = await apiFetch("/products?isTop=true");
    const randomNumbersList = randomNumberList(data);
    const sliceTopProduct = randomNumbersList.map(i => data[i]);
    setTopProductList(sliceTopProduct);
  }

  render() {
    const { arrayProducts, history } = this.props;
    if (arrayProducts.length === 0) {
      return (
        <div className={styles.wrapper}>
          <Loading />
        </div>
      );
    }
    return (
      <div className={styles.wrapper}>
        {arrayProducts.map(
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

const randomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const randomNumberList = data => {
  let arrRandomNumbers = [];
  for (let i = 0; arrRandomNumbers.length !== TOP_PRODUCT_LIST_LENGTH; i++) {
    const randNumber = randomNumber(0, data.length - 1);
    if (arrRandomNumbers.indexOf(randNumber) === -1) {
      arrRandomNumbers.push(randNumber);
    }
  }
  return arrRandomNumbers;
};

const HomeWithLocation = withRouter(Home);

export default connect(
  ({ home }) => ({
    arrayProducts: home
  }),
  { setTopProductList }
)(HomeWithLocation);
