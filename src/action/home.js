import {
  END_DATA_PRODUCT_DETAILS,
  ERROR_DATA_PRODUCT_DETAILS,
  SLICE_RANDOM_TOP_PRODUCT_LIST,
  START_DATA_PRODUCT_DETAILS,
  TOP_PRODUCT_LIST_LENGTH
} from "../constants";
import apiFetch from "../utils/apiFetch";
import { randomNumberList } from "../utils/randomNumberList";

export const sliceRandomProductList = () => {
  return async dispatch => {
    dispatch({ type: START_DATA_PRODUCT_DETAILS });
    const res = await apiFetch("/products?isTop=true");
    if (res.status === 200) {
      dispatch({ type: END_DATA_PRODUCT_DETAILS });
    } else {
      return dispatch({ type: ERROR_DATA_PRODUCT_DETAILS });
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
