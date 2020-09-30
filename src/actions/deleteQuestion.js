import * as actions from "./actiontypes.js";

export const deleteQuestion = (eid, id) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    // console.log(id, question);
    const firestore = getFirebase().firestore();
    firestore
      .collection("questions")
      .doc(eid)
      .collection(eid)
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: actions.deleteQuestion,
          successcode: "200",
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.deleteQuestionErr,
          err: err,
        });
      });
  };
};
