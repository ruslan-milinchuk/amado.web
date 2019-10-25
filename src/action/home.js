import { WRITE_ARR_PRODUCTS_TO_STORE } from "../constants";

export const writeProductsToStore = (arr) => ({
  type: WRITE_ARR_PRODUCTS_TO_STORE,
  arr
});
