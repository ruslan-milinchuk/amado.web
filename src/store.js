import { createStore, applyMiddleware } from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history))
);

const store = createStore(rootReducer, enhancer);

window.store = store;

export default store;
