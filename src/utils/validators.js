import { REQUIRED_FIELD } from "../constants";
import { isMaxLength } from "./isMaxLength";

export const requiredField = value => {
  if (value) {
    return null;
  }
  return REQUIRED_FIELD;
};

export const maxLengthCreator = maxLength => value => {
  if (value && value.length > maxLength) {
    return isMaxLength(maxLength);
  }
  return null;
};
