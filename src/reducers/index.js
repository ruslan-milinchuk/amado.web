import { combineReducers } from "redux";
import { header } from "./header";
import { home } from "./home";

const rootReducer = combineReducers({ header, home });

export default rootReducer;
