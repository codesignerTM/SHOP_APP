import { ADD_ORDER, FETCH_ORDERS } from "../actions/orders";
import Order from "../../models/order.model";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        orders: action.orders
      };
      break;
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
      break;

    default:
      break;
  }
  return state;
};
