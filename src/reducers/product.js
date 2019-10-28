import {
  CHOOSE_IMG,
  END_DATA_PRODUCT_DETAILS,
  SET_DATA_PRODUCT_DETAILS,
  START_DATA_PRODUCT_DETAILS,
  ERROR_DATA_PRODUCTS
} from "../constants";

const BASIC_STATE = {
  error: "",
  loader: false,
  productData: {},
  sliderData: {
    imgList: [],
    activeImg: ""
  }
};
export const product = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case START_DATA_PRODUCT_DETAILS:
      return { ...state, loader: true };

    case SET_DATA_PRODUCT_DETAILS:
      const { slider } = payload;
      const sliceSlider = slider.slice(0, 4);
      return {
        ...state,
        productData: payload,
        sliderData: { imgList: sliceSlider, activeImg: slider[0] }
      };

    case END_DATA_PRODUCT_DETAILS:
      return { ...state, loader: false };

    case CHOOSE_IMG:
      const activeSlider = payload;
      const { sliderData } = state;
      return {
        ...state,
        sliderData: { ...sliderData, activeImg: activeSlider }
      };

    case ERROR_DATA_PRODUCTS:
      return {
        ...state,
        sliderData: { ...sliderData, error: payload }
      };

    default:
      return state;
  }
};
