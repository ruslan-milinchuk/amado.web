import {
  ADD_TO_CART,
  CHANGE_QTY_PRODUCT,
  CHANGE_QTY_PRODUCT_CART,
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_CART_DOWN,
  CHANGE_QTY_PRODUCT_UP,
  CHANGE_QTY_PRODUCT_CART_UP,
  SET_QTY_ENTER_VALUE,
  CHECK_LOCAL_STORAGE,
  CART_STORAGE
} from "../constants";

import { setCartToStorage } from "../utils/setCartToStorage";
import { getCartFromStorage } from "../utils/getCartFromStorage";

export const checkLocalStorage = () => {
  return async dispatch => {
    const cartFromStorage = await getCartFromStorage(CART_STORAGE);
    if (cartFromStorage) {
      return dispatch({
        type: CHECK_LOCAL_STORAGE,
        payload: cartFromStorage
      });
    }
  };
};

export const addToCart = (idProduct, activeImg, title, price) => {
  return async (dispatch, getState) => {
    const { cart } = getState();
    const { qtyProduct } = cart;
    const item = {
      id: idProduct,
      qty: qtyProduct,
      img: activeImg,
      title: title,
      price: price
    };
    await setCartToStorage(CART_STORAGE, {
      ...cart.cartList,
      [item.id]: item
    });
    return dispatch({
      type: ADD_TO_CART,
      payload: { item }
    });
  };
};

export const changeQtyProduct = (controlQty, item) => {
  return async (dispatch, getState) => {
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
        await setCartToStorage(CART_STORAGE, {
          ...cart.cartList,
          [item.id]: { ...item, qty: qty + 1 }
        });
        dispatch({
          type: CHANGE_QTY_PRODUCT_CART,
          payload: { qty: parseInt(item.qty + 1), itemCart }
        });
      }

      if (controlQty === CHANGE_QTY_PRODUCT_CART_DOWN && item.qty - 1 > 0) {
        await setCartToStorage(CART_STORAGE, {
          ...cart.cartList,
          [item.id]: { ...item, qty: qty - 1 }
        });
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
      const newQty = qtyProduct - 1;
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
