import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./home.module.css";
import { writeProductsToStore } from "../../action/home";
import { LENGTH_ARR_PRODUCTS_FOR_HOME } from "../../constants";

class Home extends Component {
  async componentDidMount() {
    const { writeProductsToStore } = this.props;
    const data = await fetch(
      `https://frozen-garden-29504.herokuapp.com/products?isTop=true`,
      {
        method: "GET"
      }
    );

    const allListProduct = await data.json();

    let arrRandomNumbers = [];
    for (let i = 0; arrRandomNumbers.length !== 9; i++) {
      const randomNumber = this.randomNumber(0, allListProduct.length - 1);
      if (arrRandomNumbers.indexOf(randomNumber) === -1) {
        arrRandomNumbers.push(randomNumber);
      }
    }
    let arrNeededProducts = [];
    for (let i = 0; i < LENGTH_ARR_PRODUCTS_FOR_HOME; i++) {
      arrNeededProducts.push(allListProduct[arrRandomNumbers[i]]);
    }

    writeProductsToStore(arrNeededProducts);
  }

  render() {
    const { arrayProducts, history } = this.props;
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

  randomNumber = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };
}

const HomeWithLocation = withRouter(Home);

export default connect(
  ({ home }) => ({
    arrayProducts: home
  }),
  { writeProductsToStore }
)(HomeWithLocation);
