import { createStore, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers/index";

const history = createBrowserHistory();

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger);

const store = createStore(rootReducer, enhancer);

window.store = store;

export default store;
