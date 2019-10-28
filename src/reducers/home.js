import {
  END_DATA_PRODUCT_DETAILS,
  SLICE_RANDOM_TOP_PRODUCT_LIST,
  START_DATA_PRODUCT_DETAILS
} from "../constants";

const BASIC_STATE = { sliceTopProduct: [], loader: false };

export const home = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case START_DATA_PRODUCT_DETAILS:
      return { ...state, loader: true };

    case SLICE_RANDOM_TOP_PRODUCT_LIST:
      return { ...state, sliceTopProduct: payload };

    case END_DATA_PRODUCT_DETAILS:
      return { ...state, loader: false };

    default:
      return state;
  }
};
