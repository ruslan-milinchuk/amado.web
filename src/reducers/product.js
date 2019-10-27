import {
  CHOOSE_IMG,
  END_DATA_PRODUCT_DETAILS,
  SET_DATA_PRODUCT_DETAILS,
  START_DATA_PRODUCT_DETAILS
} from "../constants";

const BASIC_STATE = {
  loader: false,
  productData: {},
  sliderData: {
    allSliders: [],
    slideActive: ""
  }
};
export const product = (state = BASIC_STATE, { type, payload }) => {
  switch (type) {
    case START_DATA_PRODUCT_DETAILS:
      return { ...state, loading: true };

    case SET_DATA_PRODUCT_DETAILS:
      const { slider } = payload;
      const sliceSlider = slider.slice(0, 4);
      return {
        ...state,
        productData: payload,
        sliderData: { allSliders: sliceSlider, slideActive: slider[0] }
      };

    case END_DATA_PRODUCT_DETAILS:
      return { ...state, loading: false };

    // eslint-disable-next-line no-fallthrough
    case CHOOSE_IMG:
      const activeSlider = payload;
      const { sliderData } = state;
      return {
        ...state,
        sliderData: { ...sliderData, slideActive: activeSlider }
      };

    default:
      return state;
  }
};
