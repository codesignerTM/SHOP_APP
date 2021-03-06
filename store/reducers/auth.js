import { AUTHENTICATE, SIGN_OUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
      break;
    /*  case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId
      };
      break; */
    case SIGN_OUT:
      return initialState;
      break;
    default:
      return state;
      break;
  }
};
