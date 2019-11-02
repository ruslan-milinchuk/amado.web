import {
  GET_DATA_FILTER,
  MIN_VIEW_SHOP,
  GET_ACTIVE_LIST,
  GET_START_ACTIVE_LIST,
  CHANGE_STATE_IS_POPULAR,
  CHANGE_VIEW_STATUS,
  CLICK_CONTROL,
  GET_ACTIVE_LIST_FROM_ALL_LIST
} from "../constants";

const BASIC = {
  view: MIN_VIEW_SHOP,
  viewOpen: false,
  startList: 0,
  activeType: "",
  isPopular: false,
  listProduct: [],
  listProductStart: [],
  allList: {},
  types: [],
  popular: []
};

export const shop = (state = BASIC, { type, payload }) => {
  switch (type) {
    case GET_DATA_FILTER:
      const { types, popular } = payload;
      return {
        ...state,
        types,
        popular
      };

    case GET_ACTIVE_LIST:
      const { activeList, activeType, item, listToAll } = payload;
      const { allList } = state;
      return {
        ...state,
        listProduct: activeList,
        activeType: activeType,
        view: item ? item : state.view,
        allList: { ...allList, [listToAll]: activeList },
        startList: 0
      };

    case GET_START_ACTIVE_LIST:
      return {
        ...state,
        listProduct: payload,
        listProductStart: payload
      };

    case CHANGE_STATE_IS_POPULAR:
      const { isPopular } = state;
      return {
        ...state,
        listProduct: payload,
        isPopular: !isPopular
      };

    case CHANGE_VIEW_STATUS:
      const { viewOpen } = state;
      return {
        ...state,
        viewOpen: !viewOpen
      };

    case CLICK_CONTROL:
      return {
        ...state,
        startList: payload.startList,
        allList: {
          ...state.allList,
          [payload.listToAll]: { ...payload.activeList }
        },
        listProduct: payload.activeList
      };

    case GET_ACTIVE_LIST_FROM_ALL_LIST:
      return {
        ...state,
        listProduct: payload.activeList,
        startList: payload.startList
      };

    default:
      return state;
  }
};
