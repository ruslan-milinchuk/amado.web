import { combineReducers } from "redux";
import { header } from "./header";
import { home } from "./home";
import { product } from "./product";
import { cart } from "./cart";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  header,
  home,
  product,
  cart,
  form: formReducer
});

export default rootReducer;
