import { SET_TOP_PRODUCT_LIST } from "../constants";

export const setTopProductList = arr => {
  return dispatch =>{
    dispatch({type: SET_TOP_PRODUCT_LIST, payload: arr})
  }
};
