import * as actions from "./actiontypes.js";

export const createUser = (user, uid) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    console.log(uid);
    const firestore = getFirebase().firestore();
    firestore
      .collection("users")
      .doc(uid)
      .set({
        ...user,
      })
      .then(() => {
        dispatch({
          type: actions.create_user,
          userName: user.name,
          class: user.class,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.create_user_err,
          err: err,
        });
      });
  };
};
