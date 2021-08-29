const store = {
  cartItems: [],
  items: [],
  limit: { from: 0, to: 10 },
  reachedEnd: false,
};

const reducer = (state = store, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        cartItems: [...store.cartItems, action.payload],
      };
    case "ITEMS_FETCH_SUCCESS":
      return {
        ...state,
        items: [...state.items, ...action.payload],
        reachedEnd: action.payload.length === 0 && true,
        limit: {
          from: state.limit.to,
          to: state.limit.to + 10,
        },
      };
    default:
      return state;
  }
};
export default reducer;
