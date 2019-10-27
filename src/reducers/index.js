import { combineReducers } from "redux";
import { header } from "./header";
import { home } from "./home";
import { product } from "./product";
import { cart } from "./cart";

const rootReducer = combineReducers({ header, home, product, cart });

export default rootReducer;
