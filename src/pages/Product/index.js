import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import styles from "./product.module.css";
import { getProduct, chooseImg } from "../../action/product";
import {
  changeQtyProduct,
  changeEnteredValue,
  addToCart
} from "../../action/cart";
import Arrow from "../../icons/Arrow";
import {
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_UP
} from "../../constants";
import Loading from "../../components/Loading";
import ThreeArrows from "../../icons/ThreeArrows";

class Product extends Component {
  componentDidMount() {
    const { history, getProduct } = this.props;
    const { pathname } = history.location;
    const idProduct = pathname.split("/")[2];
    getProduct(idProduct);
  }

  render() {
    const {
      productInfo,
      cartInfo,
      changeQtyProduct,
      changeEnteredValue,
      chooseImg,
      addToCart
    } = this.props;
    const { history } = this.props;
    const { pathname } = history.location;
    const idProduct = pathname.split("/")[2];
    const { loader, productData, sliderData } = productInfo;
    const { qtyProduct } = cartInfo;
    const { slideActive, allSliders } = sliderData;
    const { price, title, shortDescription, type } = productData;
    return (
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <h4 className={styles.linkTo}> shop</h4>
          <ThreeArrows />
          <h4 className={styles.linkTo}> {type} </h4>
          <ThreeArrows />
          <h4 className={styles.titleLink}> {title}</h4>
        </div>
        <Slider
          listImg={allSliders}
          slideActive={slideActive}
          chooseImg={chooseImg}
          loader={loader}
        />
        <div className={styles.info}>
          <div className={styles.price}>${price}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{shortDescription}</div>
          <div className={styles.qty}>
            <p className={styles.qtyTitle}>Qty</p>
            <div className={styles.qtyCount}>
              <input
                className={styles.input}
                onChange={event =>
                  changeEnteredValue(parseInt(event.target.value))
                }
                type="text"
                placeholder="Input field"
                value={qtyProduct}
              />
              <div className={styles.qtyControl}>
                <div
                  onClick={() => changeQtyProduct(CHANGE_QTY_PRODUCT_UP)}
                  className={styles.qtyControlTop}
                >
                  <Arrow />
                </div>
                <div
                  onClick={() => changeQtyProduct(CHANGE_QTY_PRODUCT_DOWN)}
                  className={styles.qtyControlBottom}
                >
                  <Arrow />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btn} onClick={() => addToCart(idProduct)}>
            Add to cart
          </div>
        </div>
      </div>
    );
  }
}

const Slider = ({ listImg, slideActive, chooseImg, loader }) => {
  if (loader) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className={styles.slider}>
        <div className={styles.slide}>
          <div className={`${styles.inner} ${styles.correlationHeight}`}>
            <div className={styles.content}>
              <img
                className={`${styles.img} ${styles.imgLarge}`}
                src={slideActive.large}
                alt="product"
              />
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {listImg
            ? listImg.map(({ id, small, large }, index) => (
                <div
                  key={id}
                  className={
                    slideActive.large === large
                      ? `${styles.item} ${styles.itemActive}`
                      : `${styles.item}`
                  }
                  onClick={() => chooseImg(index)}
                >
                  <div
                    className={`${styles.inner} ${styles.correlationHeight}`}
                  >
                    <div className={styles.content}>
                      <img className={styles.img} src={small} alt="product" />
                    </div>
                  </div>
                </div>
              ))
            : true}
        </div>
      </div>
    );
  }
};

const ProductWithLocation = withRouter(Product);

export default connect(
  ({ product, cart }) => ({
    productInfo: product,
    cartInfo: cart
  }),
  { getProduct, changeQtyProduct, changeEnteredValue, chooseImg, addToCart }
)(ProductWithLocation);
