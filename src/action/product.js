import {
  END_DATA_PRODUCT_DETAILS,
  CHOOSE_IMG,
  START_DATA_PRODUCT_DETAILS,
  SET_DATA_PRODUCT_DETAILS
} from "../constants";
import apiFetch from "../utils/apiFetch";

export const getProduct = idProduct => {
  return async dispatch => {
    dispatch({ type: START_DATA_PRODUCT_DETAILS });
    const data = await apiFetch(`/products/${idProduct}`);
    if (data.status === 200) {
      dispatch({ type: END_DATA_PRODUCT_DETAILS });
    }
    dispatch({ type: SET_DATA_PRODUCT_DETAILS, payload: data });
  };
};

export const chooseImg = imgIndex => {
  return async (dispatch, getState) => {
    const { product } = getState();
    const { allSliders } = product.sliderData;
    const activeSlider = allSliders[imgIndex];
    dispatch({ type: CHOOSE_IMG, payload: activeSlider });
  };
};
