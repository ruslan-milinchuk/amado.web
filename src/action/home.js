import {
  END_DATA_PRODUCTS,
  ERROR_DATA_PRODUCTS,
  SLICE_RANDOM_TOP_PRODUCT_LIST,
  START_DATA_PRODUCTS,
  TOP_PRODUCT_LIST_LENGTH
} from "../constants";
import apiFetch from "../utils/apiFetch";
import { randomNumberList } from "../utils/randomNumberList";

export const sliceRandomProductList = () => {
  return async dispatch => {
    dispatch({ type: START_DATA_PRODUCTS });
    const res = await apiFetch("/products?isTop=true");
    if (res.status === 200) {
      dispatch({ type: END_DATA_PRODUCTS });
    } else {
      return dispatch({
        type: ERROR_DATA_PRODUCTS,
        payload: "FALL get products list"
      });
    }
    const topProductList = await res.json();

    const randomNumbersList = randomNumberList(
      topProductList,
      TOP_PRODUCT_LIST_LENGTH
    );
    const sliceTopProduct = randomNumbersList.map(i => topProductList[i]);
    dispatch({ type: SLICE_RANDOM_TOP_PRODUCT_LIST, payload: sliceTopProduct });
  };
};
