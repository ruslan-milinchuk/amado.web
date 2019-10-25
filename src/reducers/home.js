import { WRITE_ARR_PRODUCTS_TO_STORE } from "../constants";

const BASIC_STATE = [];

export const home = (state = BASIC_STATE, { type, arr }) => {
  if (type === WRITE_ARR_PRODUCTS_TO_STORE) {
    return arr;
  } else {
    return state;
  }
};
