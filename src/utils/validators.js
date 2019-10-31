import { IS_MAX_LENGTH, REQUIRED_FIELD } from "../constants";

export const requiredField = value => {
  if (value) {
    return null;
  }
  return REQUIRED_FIELD;
};

export const maxLengthCreator = maxLength => value => {
  if (value && value.length > maxLength) {
    return IS_MAX_LENGTH;
  }
  return null;
};
