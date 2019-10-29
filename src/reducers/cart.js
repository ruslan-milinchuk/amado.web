import {
  ADD_TO_CART,
  SET_QTY_ENTER_VALUE,
  CHANGE_QTY_PRODUCT,
  CHANGE_QTY_PRODUCT_CART,
  CHECK_LOCAL_STORAGE
} from "../constants";

const BASIC_STATE = { qtyProduct: 1, cartList: [] };

export const cart = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case SET_QTY_ENTER_VALUE:
    case CHANGE_QTY_PRODUCT:
      return { ...state, qtyProduct: payload };

    case CHECK_LOCAL_STORAGE:
      return {
        ...state,
        cartList: payload
      };

    case CHANGE_QTY_PRODUCT_CART:
      const { qty, itemCart } = payload;
      return {
        ...state,
        cartList: {
          ...state.cartList,
          [itemCart.id]: { ...itemCart, qty: qty }
        }
      };

    case ADD_TO_CART:
      const { item } = payload;
      return {
        ...state,
        cartList: { ...state.cartList, [item.id]: item }
      };

    default:
      return state;
  }
};
