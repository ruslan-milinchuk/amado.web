import React, { Component } from "react";
import cx from "classnames";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import styles from "./product.module.css";
import { getProduct, chooseImg } from "../../action/product";
import {
  changeQtyProduct,
  enterQtyProductInDetails,
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
    const { history, getProduct, enterQtyProductInDetails } = this.props;
    const { pathname } = history.location;
    const idProduct = pathname.split("/")[2];
    getProduct(idProduct);
    enterQtyProductInDetails(1);
  }

  render() {
    const {
      productInfo,
      cartInfo,
      changeQtyProduct,
      enterQtyProductInDetails,
      chooseImg,
      addToCart,
      history
    } = this.props;
    const { pathname } = history.location;
    const idProduct = pathname.split("/")[2];
    const { error, loader, productData, sliderData } = productInfo;
    const { qtyProduct } = cartInfo;
    const { activeImg, imgList } = sliderData;
    const {
      price,
      title,
      shortDescription,
      type,
      keyFeaturesText
    } = productData;
    if (error) {
      return <h4>ERROR: {error}</h4>;
    }
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
          listImg={imgList}
          activeImg={activeImg}
          chooseImg={chooseImg}
          loader={loader}
        />
        <div className={styles.info}>
          <div className={styles.price}>${price}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>
            <p>{shortDescription}</p>
            <p> {keyFeaturesText}</p>
          </div>
          <div className={styles.qty}>
            <p className={styles.qtyTitle}>Qty</p>
            <div className={styles.qtyCount}>
              <input
                className={styles.input}
                onChange={event =>
                  enterQtyProductInDetails(parseInt(event.target.value))
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
          <button
            className={styles.btn}
            disabled={qtyProduct.length <= 0}
            onClick={() => addToCart(idProduct, activeImg, title, price)}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

const Slider = ({ listImg, activeImg, chooseImg, loader }) => {
  if (loader) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.slider}>
      <div className={styles.slide}>
        <div className={cx(styles.inner, styles.correlationHeight)}>
          <div className={styles.content}>
            <img
              className={cx(styles.img, styles.imgMain)}
              src={activeImg.large}
              alt="product"
            />
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {listImg.map(({ id, small, large }, index) => (
          <div
            key={id}
            className={cx(styles.item, {
              [styles.itemActive]: activeImg.large === large
            })}
            onClick={() => chooseImg(index)}
          >
            <div className={cx(styles.inner, styles.correlationHeight)}>
              <div className={styles.content}>
                <img className={styles.img} src={small} alt="product" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductWithLocation = withRouter(Product);

export default connect(
  ({ product, cart }) => ({
    productInfo: product,
    cartInfo: cart
  }),
  {
    getProduct,
    changeQtyProduct,
    enterQtyProductInDetails,
    chooseImg,
    addToCart
  }
)(ProductWithLocation);
