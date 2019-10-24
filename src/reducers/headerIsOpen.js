import { CHANGE_IS_OPEN } from "../constants";

const BASIC_STATE = true;

export const headerIsOpen = (state = BASIC_STATE, { type }) => {
  if (type === CHANGE_IS_OPEN) {
    return !state;
  } else {
    return state;
  }
};

