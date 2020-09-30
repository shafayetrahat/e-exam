export const deleteUser = (userId) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    const firestore = getFirebase().firestore();
    firestore
      .collection("users")
      .doc(userId)
      .delete()
      .then(() => {
        dispatch({
          type: "DELETE_USER",
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_USER_ERR",
          err: err,
        });
      });
  };
};
