export const approveUser = (userId) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    const firestore = getFirebase().firestore();
    firestore
      .collection("users")
      .doc(userId)
      .update({
        access: "default",
      })
      .then(() => {
        dispatch({
          type: "APPROVE_USER",
        });
      })
      .catch((err) => {
        dispatch({
          type: "APPROVE_USER_ERR",
          err: err,
        });
      });
  };
};
