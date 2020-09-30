const initState = {};

const authReducer = (state = initState, action) => {
  state = {
    authState: null,
    isLoaded: false,
  };
  return state;
};

export default authReducer;
