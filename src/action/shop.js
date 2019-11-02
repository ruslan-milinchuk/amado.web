import {
  START_DATA_FILTER,
  END_DATA_FILTER,
  ERROR_DATA_FILTER,
  GET_DATA_FILTER,
  GET_START_ACTIVE_LIST,
  GET_ACTIVE_LIST,
  CHANGE_STATE_IS_POPULAR,
  SHOP_STORAGE,
  CHANGE_VIEW_STATUS,
  CLICK_CONTROL,
  GET_ACTIVE_LIST_FROM_ALL_LIST
} from "../constants";
import apiFetch from "../utils/apiFetch";
import { isEmpty } from "../utils/isEmpty";
import { setCartToStorage } from "../utils/setCartToStorage";
import { getCartFromStorage } from "../utils/getCartFromStorage";

export const getDataFilter = () => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    if (!isEmpty(shop.types) && !isEmpty(shop.popular)) {
      return;
    }

    dispatch({ type: START_DATA_FILTER });

    const limit = 100;
    const storage = await getCartFromStorage(SHOP_STORAGE);
    if (storage.typesAndPopular) {
      dispatch({ type: END_DATA_FILTER });
      return dispatch({
        type: GET_DATA_FILTER,
        payload: storage.typesAndPopular
      });
    }

    if (!storage.typesAndPopular) {
      const getTypeList = () => {
        let listTypes = [];
        let start = 0;
        async function checkIsAll() {
          const res = await apiFetch(
            `/products?_start=${start}&_limit=${limit}`
          );
          const data = await res.json();
          await data.map(item => {
            if (listTypes.indexOf(item.type) === -1) {
              return (listTypes = [...listTypes, item.type]);
            }
          });
          if (data.length) {
            start += limit;
            return checkIsAll();
          } else return listTypes;
        }
        return checkIsAll();
      };
      const res = await apiFetch("/products?isTop=true");
      const popular = await res.json();
      const types = await getTypeList();

      if (types && popular) {
        dispatch({ type: END_DATA_FILTER });
      } else {
        return dispatch({
          type: ERROR_DATA_FILTER,
          payload: "FALL get filter"
        });
      }
      await setCartToStorage(SHOP_STORAGE, {
        ...storage,
        typesAndPopular: {
          types,
          popular
        }
      });
      dispatch({
        type: GET_DATA_FILTER,
        payload: {
          types,
          popular
        }
      });
    }
  };
};

export const getActiveList = (activeType, item) => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { view, startList, allList } = shop;
    const listToAll = `from${startList}View${view}Type${activeType}`;
    if (allList[listToAll]) {
      return dispatch({
        type: GET_ACTIVE_LIST,
        payload: {
          activeList: Object.values(allList[listToAll]),
          activeType,
          item,
          listToAll
        }
      });
    }

    if (activeType) {
      const res = await apiFetch(
        `/products?type=${activeType}&_start=${startList}&_limit=${
          item ? item : view
        }`
      );

      const activeList = await res.json();
      return dispatch({
        type: GET_ACTIVE_LIST,
        payload: { activeList, activeType, item, listToAll }
      });
    } else {
      const res = await apiFetch(
        `/products?_start=${startList}&_limit=${item ? item : view}`
      );
      const activeList = await res.json();
      dispatch({
        type: GET_ACTIVE_LIST,
        payload: { activeList, activeType, item, listToAll }
      });
    }
  };
};

export const startActiveProduct = () => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { view, startList } = shop;
    const res = await apiFetch(`/products?_start=${startList}&_limit=${view}`);
    const listProduct = await res.json();
    dispatch({ type: GET_START_ACTIVE_LIST, payload: listProduct });
  };
};

export const changeStateIsPopular = () => {
  return (dispatch, getState) => {
    const { shop } = getState();
    const { view, popular, isPopular, listProductStart } = shop;
    if (!isPopular) {
      return dispatch({
        type: CHANGE_STATE_IS_POPULAR,
        payload: popular.slice(0, view)
      });
    }
    if (isPopular && view === listProductStart.length) {
      dispatch({ type: CHANGE_STATE_IS_POPULAR, payload: listProductStart });
    }
  };
};

export const changeViewStatus = () => {
  return dispatch => {
    dispatch({ type: CHANGE_VIEW_STATUS });
  };
};

export const clickControlRight = () => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { startList, view, activeType, allList } = shop;
    const listToAll = `from${startList + view}View${view}Type${activeType}`;
    if (allList[listToAll]) {
      return dispatch({
        type: GET_ACTIVE_LIST_FROM_ALL_LIST,
        payload: {
          activeList: Object.values(allList[listToAll]),
          startList: startList + view
        }
      });
    }
    if (activeType.length) {
      const res = await apiFetch(
        `/products?type=${activeType}&_start=${startList + view}&_limit=${view}`
      );
      const activeList = await res.json();
      if (!isEmpty(activeList)) {
        dispatch({
          type: CLICK_CONTROL,
          payload: { listToAll, activeList, startList: startList + view }
        });
      }
    }

    if (!activeType.length) {
      const res = await apiFetch(
        `/products?_start=${startList + view}&_limit=${view}`
      );
      const activeList = await res.json();

      if (activeList) {
        dispatch({
          type: CLICK_CONTROL,
          payload: { listToAll, activeList, startList: startList + view }
        });
      }
    }
  };
};

export const clickControlLeft = () => {
  return async (dispatch, getState) => {
    const { shop } = getState();
    const { startList, view, activeType, allList } = shop;
    const listToAll = `from${startList - view}View${view}Type${activeType}`;
    if (startList - view < 0) {
      return;
    }
    if (allList[listToAll]) {
      return dispatch({
        type: GET_ACTIVE_LIST_FROM_ALL_LIST,
        payload: {
          activeList: Object.values(allList[listToAll]),
          startList: startList - view
        }
      });
    }
    if (activeType.length) {
      const res = await apiFetch(
        `/products?type=${activeType}&_start=${startList - view}&_limit=${view}`
      );
      const activeList = await res.json();
      if (!isEmpty(activeList)) {
        dispatch({
          type: CLICK_CONTROL,
          payload: { listToAll, activeList, startList: startList - view }
        });
      }
    }

    if (!activeType.length) {
      const res = await apiFetch(
        `/products?_start=${startList - view}&_limit=${view}`
      );
      const activeList = await res.json();

      if (activeList) {
        dispatch({
          type: CLICK_CONTROL,
          payload: { listToAll, activeList, startList: startList - view }
        });
      }
    }
  };
};
