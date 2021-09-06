import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../Redux/actions";

function CartItem(props) {
  const [productDetails, setDetails] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost:4000/getProduct",
      data: {
        body: props.cartItems.map((el) => el.productId),
      },
    }).then((res) => setDetails(res.data));
  }, [props]);

  return (
    <div>
      {productDetails.length > 0
        ? props.cartItems.map((el) => (
            <div className="cartItem">
              <h3>
                {
                  productDetails.filter((i) => i.productId === el.productId)[0]
                    .productName
                }
              </h3>
              <div>
                <img
                  src={
                    productDetails.filter(
                      (i) => i.productId === el.productId
                    )[0].images[0].src
                  }
                  alt={
                    productDetails.filter(
                      (i) => i.productId === el.productId
                    )[0].productName
                  }
                  height="100"
                ></img>
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
        : props.cartItems.length === 0
        ? "No item are added to the cart"
        : "Loading"}
    </div>
  );
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, actions)(CartItem);
