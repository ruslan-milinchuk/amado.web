import {
  ADD_TO_CART,
  CHANGE_QTY_PRODUCT,
  CHANGE_QTY_PRODUCT_CART,
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_CART_DOWN,
  CHANGE_QTY_PRODUCT_UP,
  CHANGE_QTY_PRODUCT_CART_UP,
  SET_QTY_ENTER_VALUE
} from "../constants";

export const addToCart = (idProduct, activeImg, title, price) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    const item = {
      id: idProduct,
      qty: qtyProduct,
      img: activeImg,
      title: title,
      price: price
    };
    return dispatch({
      type: ADD_TO_CART,
      payload: { item }
    });
  };
};

export const changeQtyProduct = (controlQty, item) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    if (item) {
      const { id, qty, img, title, price } = item;
      const itemCart = {
        id: id,
        qty: qty,
        img: img,
        title: title,
        price: price
      };
      if (controlQty === CHANGE_QTY_PRODUCT_CART_UP && item.qty + 1 <= 300) {
        dispatch({
          type: CHANGE_QTY_PRODUCT_CART,
          payload: { qty: parseInt(item.qty + 1), itemCart }
        });
      }

      if (controlQty === CHANGE_QTY_PRODUCT_CART_DOWN && item.qty - 1 > 0) {
        dispatch({
          type: CHANGE_QTY_PRODUCT_CART,
          payload: { qty: item.qty - 1, itemCart }
        });
      }
    }

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
