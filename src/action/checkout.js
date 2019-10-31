import {
  SET_COUNTRY_LIST
} from "../constants";
import apiFetch from "../utils/apiFetch";

export const setCountryList = () => {
  return async dispatch => {
    const res = await apiFetch("/countries");
    const data = await res.json();
    dispatch({ type: SET_COUNTRY_LIST, payload: data });
  };
};
