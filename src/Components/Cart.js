import React from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";

function Cart(props) {
  return <CartItem />;
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Cart);
