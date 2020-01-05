import PRODUCTS from "../../data/dummy-data";
import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cartItem.model";

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
  }
  return state;
};
