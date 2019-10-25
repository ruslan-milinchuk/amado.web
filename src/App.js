import React from "react";
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./App.css";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Header />
    <Layout>
      <Route exact path="/" component={Home} />
      <Route exact path="/product/" component={Product} />
      <Route path="/product/:id" component={Product} />
    </Layout>
    <Footer />
  </Router>
);

export default App;
