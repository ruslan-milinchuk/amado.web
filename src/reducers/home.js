import {
  END_DATA_PRODUCTS,
  ERROR_DATA_PRODUCT_DETAILS,
  SLICE_RANDOM_TOP_PRODUCT_LIST,
  START_DATA_PRODUCTS
} from "../constants";

const BASIC_STATE = { error: "", sliceTopProduct: [], loader: false };

export const home = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case START_DATA_PRODUCTS:
      return { ...state, loader: true };

    case SLICE_RANDOM_TOP_PRODUCT_LIST:
      return { ...state, sliceTopProduct: payload };

    case END_DATA_PRODUCTS:
      return { ...state, loader: false };

    case ERROR_DATA_PRODUCT_DETAILS:
      return {
        ...state,
        sliderData: { ...state, error: payload }
      };

    default:
      return state;
  }
};
