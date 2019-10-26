import { combineReducers } from "redux";
import { header } from "./header";
import { home } from "./home";
import { product } from "./product";

const rootReducer = combineReducers({ header, home, product });

export default rootReducer;
