import {IS_MAX_LENGTH, REQUIRED_FIELD} from "../constants";

export const requiredField = value => {
  if (value) {
    return undefined;
  }
  return REQUIRED_FIELD;
};

export const maxLengthCreator = maxLength => value => {
  if (value && value.length > maxLength) {
    return IS_MAX_LENGTH;
  }
  return undefined;
};
