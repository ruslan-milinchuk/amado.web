import React from "react";
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ShopWithFilter from "./pages/Shop";

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Header />
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/" component={Product} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/shop" component={ShopWithFilter} />
    </Layout>
    <Footer />
  </Router>
);

export default App;
