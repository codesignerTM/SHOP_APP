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
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorId = errorResponse.error.message;
        console.log("errorResponse", errorResponse);
        let message = "Something went wring!";

        if (errorId === "EMAIL_EXISTS") {
          message = "This email exists, please log in!";
        } else if (errorId === "OPERATION_NOT_ALLOWED") {
          message = "This operation is not allowed!";
        } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          message = "You tried too many times! Please come back later!";
        }
        throw new Error(message);
      }
      const resData = await response.json();
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
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorId = errorResponse.error.message;

        let message = "Something went wring!";

        if (errorId === "EMAIL_NOT_FOUND") {
          message = "This email could not be found!";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "This password is not valid!";
        }
        throw new Error(message);
      }
      const resData = await response.json();
    } catch (error) {
      console.log("error login", error);
      throw new Error(error);
    }
    dispatch({ type: LOG_IN });
  };
};
