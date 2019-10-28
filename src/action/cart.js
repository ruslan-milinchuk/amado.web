import {
  ADD_TO_CART,
  CHANGE_QTY_PRODUCT,
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_UP,
  GET_PRODUCTS_DETAILS_CART,
  SET_QTY_ENTER_VALUE,
  START_DATA_PRODUCT_DETAILS
} from "../constants";

import { getProductDetails } from "../utils/getProductDetails";

export const addToCart = idProduct => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    return dispatch({
      type: ADD_TO_CART,
      payload: { idProduct, qtyProduct }
    });
  };
};

export const getProductsDetailsCart = () => {
  return async (dispatch, getState) => {
    dispatch({ type: START_DATA_PRODUCT_DETAILS });
    const store = getState();
    const { cartList } = store.cart;
    let detailsProduct = [];
    await cartList.map(item => {
      const { id, qty } = item;
      detailsProduct.push({
        detailsProduct: getProductDetails(id),
        qtyProduct: qty
      });
    });
    dispatch({ type: GET_PRODUCTS_DETAILS_CART, payload: detailsProduct });
  };
};

export const changeQtyProduct = controlQty => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    if (controlQty === CHANGE_QTY_PRODUCT_UP) {
      const newQty = parseInt(qtyProduct + 1);
      if (qtyProduct + 1 <= 300) {
        dispatch({ type: CHANGE_QTY_PRODUCT, payload: newQty });
      }
    }

    if (controlQty === CHANGE_QTY_PRODUCT_DOWN) {
      const newQty = parseInt(qtyProduct - 1);
      if (qtyProduct - 1 > 0) {
        dispatch({ type: CHANGE_QTY_PRODUCT, payload: newQty });
      }
    }
  };
};

export const enterQtyProductInDetails = enteredValue => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    if (enteredValue > 0 && enteredValue <= 300) {
      dispatch({ type: SET_QTY_ENTER_VALUE, payload: enteredValue });
    }
    if (enteredValue > 300) {
      dispatch({ type: SET_QTY_ENTER_VALUE, payload: qtyProduct });
    }

    if (!enteredValue) {
      dispatch({ type: SET_QTY_ENTER_VALUE, payload: "" });
    }
  };
};
