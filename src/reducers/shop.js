import {
  MIN_VIEW_SHOP,
  GET_START_PAGE,
  SET_NEW_SEARCH_PARAMS,
  SET_NEW_LIST_PRODUCT,
  CHECK_CONTROL_STATE,
  SET_TYPE_ALL
} from "../constants";

const BASIC = {
  params: {
    type: undefined,
    _sort: "createdAt",
    _start: 0,
    _limit: MIN_VIEW_SHOP,
    _q: undefined,
    isTop: undefined
  },
  list: {},
  allList: {},
  controlLeftActive: false,
  controlRightActive: true
};

export const shop = (state = BASIC, { type, payload }) => {
  const { allList } = state;
  switch (type) {
    case GET_START_PAGE:
      return {
        ...state,
        list: payload,
        allList: { ...allList, ...payload }
      };

    case SET_NEW_SEARCH_PARAMS:
      return {
        ...state,
        params: { ...payload, _q: undefined }
      };

    case SET_NEW_LIST_PRODUCT:
      return {
        ...state,
        list: payload,
        allList: { ...allList, ...payload }
      };

    case CHECK_CONTROL_STATE:
      return {
        ...state,
        ...payload
      };

    case SET_TYPE_ALL:
      const { params } = state;
      return {
        ...state,
        params: { ...params, type: undefined }
      };

    default:
      return state;
  }
};
