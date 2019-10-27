import { CHANGE_MENU_STATUS } from "../constants";

export const changeMenuStatus = () => {
  return (dispatch, getState)=> {
    const { header } = getState();
    dispatch({type:CHANGE_MENU_STATUS, payload: !header})
  }
};
