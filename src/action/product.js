import {
  GET_PRODUCT,
  CHANGE_QTY_PRODUCT,
  SET_QTY_ENTER_VALUE,
  CHANGE_SLIDE,
  CHOOSE_IMG
} from "../constants";

export const getProduct = productDetails => ({
  type: GET_PRODUCT,
  productDetails
});

export const changeQtyProduct = qtyProduct => ({
  type: CHANGE_QTY_PRODUCT,
  qtyProduct
});

export const changeEnteredValue = enteredValue => ({
  type: SET_QTY_ENTER_VALUE,
  enteredValue
});

export const changeSlide = () => ({
  type: CHANGE_SLIDE
});

export const chooseImg = (imgIndex) => ({
  type: CHOOSE_IMG,
  imgIndex
});
