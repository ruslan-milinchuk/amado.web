import {
  ADD_TO_CART,
  SET_QTY_ENTER_VALUE,
  CHANGE_QTY_PRODUCT
} from "../constants";

const BASIC_STATE = { qtyProduct: "1", cartList: [] };

export const cart = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case SET_QTY_ENTER_VALUE:
    case CHANGE_QTY_PRODUCT:
      return { ...state, qtyProduct: payload };

    case ADD_TO_CART:
      return {
        ...state,
        cartList: Object.values(payload)
      };

    default:
      return state;
  }
};
