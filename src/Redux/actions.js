export function addItemToCart(productId) {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: productId,
  };
}
