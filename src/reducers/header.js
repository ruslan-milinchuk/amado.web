import { CHANGE_MENU_STATUS } from "../constants";

const BASIC_STATE = true;

export const header = (state = BASIC_STATE, { type }) => {
  if (type === CHANGE_MENU_STATUS) {
    return !state;
  } else {
    return state;
  }
};
