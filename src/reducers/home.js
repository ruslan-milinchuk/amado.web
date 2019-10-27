import { SET_TOP_PRODUCT_LIST } from "../constants";

const BASIC_STATE = [];

export const home = (state = BASIC_STATE, { type, payload }) =>
  type === SET_TOP_PRODUCT_LIST ? payload : state;
