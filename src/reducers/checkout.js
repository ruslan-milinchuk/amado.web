import { SET_COUNTRY_LIST } from "../constants";

export const checkout = (state = { countriesList: [] }, { type, payload }) =>
  type === SET_COUNTRY_LIST ? { countriesList: [...payload] } : state;
