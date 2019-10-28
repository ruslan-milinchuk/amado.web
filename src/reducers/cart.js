import {
  ADD_TO_CART,
  SET_QTY_ENTER_VALUE,
  CHANGE_QTY_PRODUCT,
  GET_PRODUCTS_DETAILS_CART
} from "../constants";

const BASIC_STATE = { qtyProduct: "", cartList: [], cartWithDetails: [] };

export const cart = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case SET_QTY_ENTER_VALUE:
    case CHANGE_QTY_PRODUCT:
      return { ...state, qtyProduct: payload };

    case ADD_TO_CART:
      const { cartList } = state;
      const { idProduct, qtyProduct } = payload;
      if (cartList.findIndex(item => item.id === idProduct) === -1) {
        return {
          ...state,
          cartList: [...cartList, { id: idProduct, qty: qtyProduct }]
        };
      }

      if (cartList.findIndex(item => item.id === idProduct) !== -1) {
        const newState = { ...state };
        newState.cartList.map(item => {
          if (item.id === idProduct) {
            item.qty = qtyProduct;
          }
          return newState;
        });
      }

    case GET_PRODUCTS_DETAILS_CART:
      const { detailsProduct } = payload;
      return { ...state, detailsProduct };

    default:
      return state;
  }
};
