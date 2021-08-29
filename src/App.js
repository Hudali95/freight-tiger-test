import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";

import "./index.css";
import reducer from "./Redux/reducer";
import { MdShoppingCart } from "react-icons/md";

function App() {
  return (
    <Provider store={createStore(reducer)}>
      <div>
        <Router>
          <div className="headerBar commonPadding">
            <div>Fresh Stocks</div>
            <Link to="/cart">
              <button className="actionButton cartButton">
                <MdShoppingCart />
              </button>
            </Link>
          </div>
          <Switch>
            <Route path="/" exact strict component={Dashboard} />
            <Route path="/cart" exact strict component={Cart} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
