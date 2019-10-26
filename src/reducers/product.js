import {
  CHANGE_QTY_PRODUCT,
  CHANGE_QTY_PRODUCT_DOWN,
  CHANGE_QTY_PRODUCT_UPP,
  GET_PRODUCT,
  SET_QTY_ENTER_VALUE,
  CHANGE_SLIDE,
  CHOOSE_IMG
} from "../constants";

const BASIC_STATE = {
  details: [],
  qtyProducts: "",
  sliderStore: [],
  slideIndex: 0,
  slideActive: ""
};
export const product = (
  state = BASIC_STATE,
  { type, productDetails, qtyProduct, enteredValue, imgIndex }
) => {
  switch (type) {
    case GET_PRODUCT:
      let newState = { ...state };
      newState["details"] = productDetails;
      newState["sliderStore"] = productDetails.slider;
      return newState;

    case CHANGE_SLIDE:
      let newStateSlide = { ...state };
      if (
        newStateSlide["slideIndex"] + 1 <=
        newStateSlide["sliderStore"].length - 1
      ) {
        newStateSlide["slideIndex"]++;
        newStateSlide["slideActive"] =
          newStateSlide["sliderStore"][newStateSlide["slideIndex"]];
        return newStateSlide;
      }

      if (
        newStateSlide["slideIndex"] + 1 >
        newStateSlide["sliderStore"].length - 1
      ) {
        let newStateStore = { ...state };
        if (
          newStateStore["slideIndex"] + 1 <=
          newStateStore["sliderStore"].length
        ) {
          newStateStore["slideIndex"] = 0;
          newStateStore["slideActive"] =
            newStateStore["sliderStore"][newStateStore["slideIndex"]];
          return newStateStore;
        }
      }

      return newStateSlide;
    case SET_QTY_ENTER_VALUE:
      if (enteredValue > 0 && enteredValue <= 300) {
        let newState = { ...state };
        newState["qtyProducts"] = enteredValue;
        return newState;
      }
    case CHANGE_QTY_PRODUCT:
      if (qtyProduct === CHANGE_QTY_PRODUCT_UPP) {
        let newState = { ...state };
        if (newState["qtyProducts"] + 1 <= 300) {
          newState["qtyProducts"]++;
          return newState;
        }
      }

      if (qtyProduct === CHANGE_QTY_PRODUCT_DOWN) {
        let newState = { ...state };
        if (newState["qtyProducts"] - 1 > 0) {
          newState["qtyProducts"]--;
          return newState;
        }
      }

    case CHOOSE_IMG:
      let newStateImg = { ...state };
      newStateImg["slideIndex"] = imgIndex;
      newStateImg["slideActive"] =
        newStateImg["sliderStore"][newStateImg["slideIndex"]];
      return newStateImg;

    default:
      return state;
  }
};
