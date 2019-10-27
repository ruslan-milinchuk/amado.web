import {
  ADD_TO_CART,
  SET_QTY_ENTER_VALUE,
  CHANGE_QTY_PRODUCT
} from "../constants";

const BASIC_STATE = { qtyProduct: "", cartList: [] };

export const cart = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case SET_QTY_ENTER_VALUE:
      return { ...state, qtyProduct: payload };

    case CHANGE_QTY_PRODUCT:
      return { ...state, qtyProduct: payload };

    case ADD_TO_CART:
      const { cartList } = state;
      const { idProduct, qtyProduct } = payload;
      return { ...state, cartList: [...cartList, [idProduct, qtyProduct]] };

    default:
      return state;
  }
};
