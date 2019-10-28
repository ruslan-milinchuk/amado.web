import {
  ADD_TO_CART,
  SET_QTY_ENTER_VALUE,
  CHANGE_QTY_PRODUCT
} from "../constants";

const BASIC_STATE = { qtyProduct: "", cartList: [] };

export const cart = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case SET_QTY_ENTER_VALUE:
    case CHANGE_QTY_PRODUCT:
      return { ...state, qtyProduct: payload };

    case ADD_TO_CART:
      const { cartList } = state;
      const { idProduct, qtyProduct, activeImg, title } = payload;
      if (cartList.findIndex(item => item.id === idProduct) === -1) {
        return {
          ...state,
          cartList: [
            ...cartList,
            { id: idProduct, qty: qtyProduct, img: activeImg, title: title }
          ]
        };
      }

      if (cartList.findIndex(item => item.id === idProduct) !== -1) {
        const newState = { ...state };
        newState.cartList.map(item => {
          if (item.id === idProduct) {
          }
          return newState;
        });
      }

    default:
      return state;
  }
};
