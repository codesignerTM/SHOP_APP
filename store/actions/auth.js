import { FIREBASE_WEB_API_KEY } from "react-native-dotenv";
import { AsyncStorage } from "react-native";

/* export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN"; */
export const SIGN_OUT = "SIGN_OUT";
export const AUTHENTICATE = "AUTHENTICATE";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

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
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async dispatch => {
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
    let resData = await response.json();
    console.log("resData", resData);
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const signOut = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: SIGN_OUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(signOut());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
