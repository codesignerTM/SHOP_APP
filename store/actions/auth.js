import { FIREBASE_WEB_API_KEY } from "react-native-dotenv";

export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";
export const LOG_IN = "LOG_IN";

export const signUp = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          FIREBASE_WEB_API_KEY,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
      const resData = await response.json();

      console.log("resData signup", resData);
    } catch (error) {
      console.log("error signup", error);
      throw error;
    }
    dispatch({ type: SIGN_UP });
  };
};
export const signOut = () => {
  return {};
};

export const logIn = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          FIREBASE_WEB_API_KEY,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
      const resData = await response.json();

      console.log("resData login", resData);
    } catch (error) {
      console.log("error login", error);
      throw error;
    }
    dispatch({ type: LOG_IN });
  };
};
