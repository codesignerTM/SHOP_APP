import { FIREBASE_CONNECTION_URL } from "react-native-dotenv";
import Order from "../../models/order.model";

export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDERS = "FETCH_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  const date = new Date();
  return async dispatch => {
    const response = await fetch(FIREBASE_CONNECTION_URL + "orders/u1.json", {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date //new Date().toISOString()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/")
      })
    });
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};

export const fetchOrder = () => {
  return async dispatch => {
    try {
      const response = await fetch(FIREBASE_CONNECTION_URL + "orders/u1.json");
      const resData = await response.json();
      const loadedOrders = [];

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      console.log();
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      console.log("loadedOrders", loadedOrders);
      dispatch({ type: FETCH_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};
