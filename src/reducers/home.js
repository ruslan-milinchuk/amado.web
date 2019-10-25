import { SET_TOP_PRODUCT_LIST } from "../constants";

const BASIC_STATE = [];

export const home = (state = BASIC_STATE, { type, arr }) => {
  if (type === SET_TOP_PRODUCT_LIST) {
    return arr;
  } else {
    return state;
  }
};
