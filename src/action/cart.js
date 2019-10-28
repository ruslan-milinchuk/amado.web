import {
  ADD_TO_CART,
  CHANGE_QTY_PRODUCT,
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_UP,
  SET_QTY_ENTER_VALUE
} from "../constants";

export const addToCart = (idProduct, activeImg, title) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    const item = {
      id: idProduct,
      qty: qtyProduct,
      img: activeImg,
      title: title
    };
    return dispatch({
      type: ADD_TO_CART,
      payload: {item}
    });
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
