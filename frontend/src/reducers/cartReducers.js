import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
  ) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;

      //Check if the item added already exists
      const existItem = state.cartItems.find(
        (x) => x.product === newItem.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existItem.product ? newItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
      case CART_REMOVE_ITEM :
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload )
        }
      case CART_SAVE_SHIPPING_ADDRESS :
        return {
          ...state,
          shippingAddress: action.payload
        }
    default:
      return state;
  }
};
