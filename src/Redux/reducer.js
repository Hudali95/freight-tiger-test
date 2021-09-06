const store = {
  cartItems: [],
  items: [],
  limit: { from: 0, to: 10 },
  reachedEnd: false,
  showNotification: false,
  timer: 0,
};

const reducer = (state = store, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      let cartItems;
      let item = state.cartItems.filter(
        (el) => el.productId === action.payload
      );
      if (item.length > 0) {
        item[0].count++;
        cartItems = [...state.cartItems];
      } else {
        cartItems = [
          ...state.cartItems,
          {
            productId: action.payload,
            count: 1,
          },
        ];
      }
      return {
        ...state,
        cartItems,
        showNotification: true,
        timer: 3000,
      };

    case "REMOVE_ITEM_FROM_CART":
      let singleItem = state.cartItems.filter(
        (el) => el.productId === action.payload
      )[0];
      let newAarry;
      if (singleItem.count === 1) {
        newAarry = state.cartItems.filter(
          (el) => el.productId !== action.payload
        );
      } else {
        newAarry = state.cartItems.map((el) => {
          if (el.productId === action.payload) {
            el.count = el.count - 1;
          }
          return el;
        });
      }
      console.log("newAarry", newAarry);
      return {
        ...state,
        cartItems: newAarry,
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
    case "SHOW_CART_NOTIFICATION":
      return {
        ...state,
        showNotification: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
