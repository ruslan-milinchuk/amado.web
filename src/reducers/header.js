import { CHANGE_MENU_STATUS } from "../constants";

const BASIC_STATE = true;

export const header = (state = BASIC_STATE, { type, payload }) =>
  type === CHANGE_MENU_STATUS ? payload : state;
