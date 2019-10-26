import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import styles from "./product.module.css";
import {
  getProduct,
  changeQtyProduct,
  changeEnteredValue,
  changeSlide,
  chooseImg
} from "../../action/product";
import apiFetch from "../../utils/apiFetch";
import Arrow from "../../icons/Arrow";
import {
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_UPP,
  SLIDER_IMG_TIME_ANIMATION
} from "../../constants";
import Loading from "../../components/Loading";

class Product extends Component {
  async componentDidMount() {
    const { history, getProduct, changeSlide } = this.props;
    const { pathname } = history.location;
    const idProduct = pathname.split("/")[2];
    const productsDetails = await apiFetch(`/products/${idProduct}`);
    getProduct(productsDetails);
    setInterval(() => {
      changeSlide();
    }, SLIDER_IMG_TIME_ANIMATION);
  }

  render() {
    const {
      productInfo,
      changeQtyProduct,
      changeEnteredValue,
      chooseImg
    } = this.props;
    const { details, qtyProducts, slideActive } = productInfo;
    const { price, title, shortDescription, slider, type } = details;
    return (
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <h4> shop</h4>
          <h4> > {type} </h4>
          <h4 className={styles.titleLink}>> {title}</h4>
        </div>
        <Slider
          listImg={slider}
          slideActive={slideActive}
          chooseImg={chooseImg}
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
                value={qtyProducts}
              />
              <div className={styles.qtyControl}>
                <div
                  onClick={() => changeQtyProduct(CHANGE_QTY_PRODUCT_UPP)}
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
          <div className={styles.btn}>Add to cart</div>
        </div>
      </div>
    );
  }
}

const Slider = ({ listImg, slideActive, chooseImg }) => {
  if (listImg === undefined) {
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
                src={
                  slideActive.length === 0
                    ? `${listImg[listImg.length - 1].large}`
                    : `${slideActive.large}`
                }
                alt="image product"
              />
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {listImg.map(({ id, small, large }, index) => (
            <div
              key={id}
              className={
                slideActive.large === large
                  ? `${styles.item} ${styles.itemActive}`
                  : `${styles.item}`
              }
              onClick={() => chooseImg(index)}
            >
              <div className={`${styles.inner} ${styles.correlationHeight}`}>
                <div className={styles.content}>
                  <img className={styles.img} src={small} alt="image product" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

const ProductWithLocation = withRouter(Product);

export default connect(
  ({ product }) => ({
    productInfo: product
  }),
  { getProduct, changeQtyProduct, changeEnteredValue, changeSlide, chooseImg }
)(ProductWithLocation);
