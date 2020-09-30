import * as actions from "../actions/actiontypes.js";
const initState = {
  userName: null,
  class: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.create_user:
      return state;
    case actions.create_user_err:
      console.log("error in ", action.err);
      return state;
    default:
      return state;
  }
};

export default userReducer;
