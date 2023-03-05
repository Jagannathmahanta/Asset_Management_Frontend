import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "../actions/actionType";

export const changePassword = (state = { changePassword: [] }, actions) => {
  console.log("password success at reducer", actions);
  switch (actions.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: actions.password,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePassword: actions.resetpassword,
      };

    default:
      return state;
  }
};
