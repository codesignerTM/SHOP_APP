import { FIREBASE_CONNECTION_URL } from "react-native-dotenv";

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
