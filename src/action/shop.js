import {
  SET_NEW_LIST_PRODUCT,
  SET_NEW_SEARCH_PARAMS,
  CHECK_CONTROL_STATE,
  SET_TYPE_ALL
} from "../constants";
import { GET_START_PAGE } from "../constants";
import apiFetch from "../utils/apiFetch";
import { isEmpty } from "../utils/isEmpty";

const serialize = obj => {
  const objToString = JSON.stringify(obj);
  return objToString
    .replace(/["{}]/g, "")
    .replace(/,/g, "&")
    .replace(/:/g, "=")
    .replace("At=", "At:")
    .replace("ce=", "ce:");
};

export const startPage = () => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { params } = shop;
    const res = await apiFetch(`/products?${serialize(params)}`);
    const data = await res.json();
    dispatch({
      type: GET_START_PAGE,
      payload: { [serialize(params)]: data }
    });
  };
};

export const changeParams = (name, value) => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { params, allList } = shop;
    if (allList[serialize({ ...params, [name]: value })]) {
      const newParams = { ...params, [name]: value };
      dispatch({
        type: SET_NEW_SEARCH_PARAMS,
        payload: newParams
      });
      return dispatch({
        type: SET_NEW_LIST_PRODUCT,
        payload: { [serialize(newParams)]: allList[serialize(newParams)] }
      });
    }
    const { _start, type } = params;
    if (name !== "_start" && _start !== 0) {
      return dispatch({
        type: SET_NEW_SEARCH_PARAMS,
        payload: { ...params, _start: 0 }
      });
    }

    if (name === "isTop" && params.isTop) {
      const newParams = { ...params, [name]: undefined };
      dispatch({
        type: SET_NEW_SEARCH_PARAMS,
        payload: newParams
      });
      const res = await apiFetch(`/products?${serialize(newParams)}`);
      const data = await res.json();

      return dispatch({
        type: SET_NEW_LIST_PRODUCT,
        payload: { [serialize(params)]: data }
      });
    }

    const newParams = { ...params, [name]: value };
    const res = await apiFetch(`/products?${serialize(newParams)}`);
    const data = await res.json();
    if (res.status !== 200) {
      const newParams = { ...params, _start: 0 };
      dispatch({ type: SET_NEW_SEARCH_PARAMS, payload: newParams });
      dispatch({
        type: CHECK_CONTROL_STATE,
        payload: { controlLeftActive: false }
      });
      const res = await apiFetch(`/products?${serialize(newParams)}`);
      const data = await res.json();
      return dispatch({
        type: SET_NEW_LIST_PRODUCT,
        payload: { [serialize(newParams)]: data }
      });
    }

    if (res.status === 200) {
      dispatch({
        type: CHECK_CONTROL_STATE,
        payload: { controlRightActive: true, controlLeftActive: true }
      });
    }

    if (name !== type && name !== "_start") {
      dispatch({
        type: CHECK_CONTROL_STATE,
        payload: { controlLeftActive: false }
      });
    }

    if (isEmpty(data)) {
      return dispatch({
        type: CHECK_CONTROL_STATE,
        payload: { controlRightActive: false }
      });
    }
    dispatch({ type: SET_NEW_SEARCH_PARAMS, payload: newParams });
    if (name === "_q") {
      dispatch({ type: SET_TYPE_ALL });
    }
    dispatch({
      type: SET_NEW_LIST_PRODUCT,
      payload: { [serialize(newParams)]: data }
    });
  };
};
