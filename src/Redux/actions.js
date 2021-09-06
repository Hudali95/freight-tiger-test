import axios from "axios";

export function addItemToCart(productId) {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: productId,
  };
}

export function updateCart(type, id) {
  if (type === "add") return addItemToCart(id);
  if (type === "remove")
    return {
      type: "REMOVE_ITEM_FROM_CART",
      payload: id,
    };
}

export function showCartNotification(value) {
  return {
    type: "SHOW_CART_NOTIFICATION",
    payload: value,
  };
}

export function getItems(from, to) {
  return (dispatch) => {
    return axios
      .get("http://localhost:4000/items?from=" + from + "&to=" + to)
      .then((res) =>
        dispatch({
          type: "ITEMS_FETCH_SUCCESS",
          payload: res.data,
        })
      );
  };
}
