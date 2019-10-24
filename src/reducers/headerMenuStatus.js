import { CHANGE_MENU_STATUS } from "../constants";

const BASIC_STATE = true;

export const headerMenuStatus = (state = BASIC_STATE, { type }) => {
  if (type === CHANGE_MENU_STATUS) {
    return !state;
  } else {
    return state;
  }
};
