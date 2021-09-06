import { getByDisplayValue } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { connect } from "react-redux";
import * as actions from "../Redux/actions";

const CartItem = React.memo((props) => {
  const [productDetails, setDetails] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:4000/getProduct",
      data: {
        body: props.cartItems.map((el) => el.productId),
      },
    }).then((res) => setDetails(res.data));
  }, [props.cartItems]);
  const getByDisplayValue = (param, productId) => {
    return productDetails.filter((i) => i.productId === productId)[0][param];
  };
  return (
    <div className="cartWrapper commonPadding">
      {productDetails.length > 0 ? (
        props.cartItems.map((el) => (
          <div className="cartItem boxShadow">
            <h3>{getByDisplayValue("productName", el.productId)}</h3>
            <div>
              <div className="cartItemBody">
                <img
                  src={getByDisplayValue("images", el.productId)[0].src}
                  alt={getByDisplayValue("productName", el.productId)}
                ></img>
                <div className="descRow">
                  <div className="descHeaderName ">Price</div>
                  <div className="descValue price ">
                    {getByDisplayValue("price", el.productId)}
                  </div>
                </div>
              </div>
              <div className="cartFooter">
                <button onClick={() => props.updateCart("add", el.productId)}>
                  +
                </button>
                <div className="cartCount">{el.count}</div>

                <button
                  onClick={() => props.updateCart("remove", el.productId)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        ))
      ) : props.cartItems.length === 0 ? (
        "No item are added to the cart"
      ) : (
        <div className="spinnerWrapper">
          <ImSpinner2 className="spinner" />
        </div>
      )}
    </div>
  );
});
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, actions)(CartItem);
