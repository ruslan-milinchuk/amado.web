import {
  END_DATA_PRODUCT_DETAILS,
  CHOOSE_IMG,
  START_DATA_PRODUCT_DETAILS,
  SET_DATA_PRODUCT_DETAILS,
  ERROR_DATA_PRODUCT_DETAILS
} from "../constants";
import apiFetch from "../utils/apiFetch";

export const getProduct = idProduct => {
  return async dispatch => {
    dispatch({ type: START_DATA_PRODUCT_DETAILS });
    const res = await apiFetch(`/products/${idProduct}`);
    if (res.status === 200) {
      dispatch({ type: END_DATA_PRODUCT_DETAILS });
    } else {
      return dispatch({
        type: ERROR_DATA_PRODUCT_DETAILS,
        payload: "FALL get product details"
      });
    }
    const data = await res.json();
    dispatch({ type: SET_DATA_PRODUCT_DETAILS, payload: data });
  };
};

export const chooseImg = imgIndex => {
  return async (dispatch, getState) => {
    const { product } = getState();
    const { imgList } = product.sliderData;
    const activeSlider = imgList[imgIndex];
    dispatch({ type: CHOOSE_IMG, payload: activeSlider });
  };
};
