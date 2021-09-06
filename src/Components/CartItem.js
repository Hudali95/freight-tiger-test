import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../Redux/actions";

function CartItem(props) {
  const [productDetails, setDetails] = useState([]);
  console.log(props.cartItems);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getProduct?productId=" + props.cartItems)
      .then((res) => setDetails(res.data));
  }, []);

  return <div>{productDetails.map((el) => "hello")}</div>;
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, actions)(CartItem);
