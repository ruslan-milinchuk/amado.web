import { CART_STORAGE } from "../constants";

export const deleteCartStorage = async () => {
  await localStorage.removeItem(CART_STORAGE);
};
