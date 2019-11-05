import { SET_NEW_LIST_PRODUCT, SET_NEW_SEARCH_PARAMS } from "../constants";
import apiFetch from "../utils/apiFetch";
import { isEmpty } from "../utils/isEmpty";
import { stringifySearchParams } from "../utils/stringifySearchParams";

export const getListProducts = newParams => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { list, params } = shop;
    if (list[stringifySearchParams(newParams)]) {
      return dispatch({
        type: SET_NEW_SEARCH_PARAMS,
        payload: newParams
      });
    }
    const res = await apiFetch(`/products?${stringifySearchParams(newParams)}`);
    const data = await res.json();
    if (res.status !== 200 && !list[stringifySearchParams(newParams)]) {
      const res = await apiFetch(
        `/products?${stringifySearchParams({ ...params, _start: 0 })}`
      );
      const data = await res.json();
      dispatch({
        type: SET_NEW_SEARCH_PARAMS,
        payload: { ...params, _start: 0 }
      });
      return dispatch({
        type: SET_NEW_LIST_PRODUCT,
        payload: { [stringifySearchParams({ ...params, _start: 0 })]: data }
      });
    }
    if (!isEmpty(data)) {
      dispatch({ type: SET_NEW_SEARCH_PARAMS, payload: newParams });

      return dispatch({
        type: SET_NEW_LIST_PRODUCT,
        payload: { [stringifySearchParams(newParams)]: data }
      });
    }
  };
};
