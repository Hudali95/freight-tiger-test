import React, { useState } from "react";

import Dashboard from "./Components/Dashboard";
import Cart from "./Components/Cart";

import "./index.css";

import { MdHome, MdShoppingCart } from "react-icons/md";

import { Link, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "./Redux/actions";

function App(props) {
  const [currentTab, setTab] = useState(
    props.location.pathname === "/" ? "home" : "cart"
  );

  if (props.showNotification) {
    setTimeout(() => {
      props.showCartNotification(false);
    }, props.timer);
  }
  return (
    <>
      <div className="headerBar commonPadding">
        <div>Fresh Stocks</div>
        {currentTab === "cart" ? (
          <div
            className="cartMenuWrapper"
            onClick={() => {
              setTab("home");
              props.history.push("/");
            }}
          >
            <button className="actionButton cartButton">
              <MdHome />
            </button>
          </div>
        ) : (
          <div
            className="cartMenuWrapper"
            onClick={() => {
              setTab("cart");
              props.history.push("/cart");
            }}
          >
            <button className="actionButton cartButton">
              <MdShoppingCart />
            </button>
            {props.showNotification && (
              <div className="cartNotification">
                Item has been added to the Cart!
              </div>
            )}
          </div>
        )}
      </div>
      <Switch>
        <Route path="/" exact strict component={Dashboard} />
        <Route path="/cart" exact strict component={Cart} />
      </Switch>
    </>
  );
}
const mapStateToPros = (state) => {
  return state;
};
export default compose(withRouter, connect(mapStateToPros, actions))(App);
