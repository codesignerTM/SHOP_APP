import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cartItem.model";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAMount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewProduct;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewProduct = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        console.log("update cart", prodTitle);
      } else {
        updatedOrNewProduct = new CartItem(1, prodPrice, prodTitle, prodPrice);
        console.log("add new item to cart", prodTitle);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewProduct },
        totalAMount: state.totalAMount + prodPrice
      };
    case REMOVE_FROM_CART:
      const currentQuantity = state.items[action.pId].quantity;
      const selectedCartItem = state.items[action.pId];
      let updatedCartItems;
      if (currentQuantity > 1) {
        //reduce the quantity of the product
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pId]: updatedCartItem };
      } else {
        //erase a product from cart
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAMount: state.totalAMount - selectedCartItem.productPrice
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pId]) {
        return state;
      }
      const itemTotal = state.items[action.pId].sum;
      const updatedItems = { ...state.items };
      delete updatedItems[action.pId];
      return {
        ...state,
        items: updatedItems,
        totalAMount: state.totalAMount - itemTotal
      };
  }
  return state;
};
