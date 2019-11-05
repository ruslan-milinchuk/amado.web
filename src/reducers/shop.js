import {
  MIN_VIEW_SHOP,
  SET_NEW_SEARCH_PARAMS,
  SET_NEW_LIST_PRODUCT,
} from "../constants";

const BASIC = {
  params: {
    type: undefined,
    _sort: "createdAt:asc",
    _start: 0,
    _limit: MIN_VIEW_SHOP,
    _q: undefined,
    isTop: undefined
  },
  list: {}
};

export const shop = (state = BASIC, { type, payload }) => {
  switch (type) {
    case SET_NEW_SEARCH_PARAMS:
      return {
        ...state,
        params: { ...payload }
      };

    case SET_NEW_LIST_PRODUCT:
      const { list } = state;
      return {
        ...state,
        list: { ...list, ...payload }
      };

    default:
      return state;
  }
};
