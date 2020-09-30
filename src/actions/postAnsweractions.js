import * as actions from "./actiontypes.js";

export const postAnswer = (answer, uid, examid) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    // console.log(uid);
    // console.log(answer);
    // console.log(examid);
    const firestore = getFirebase().firestore();
    const answerRef = firestore.collection("users").doc(uid).collection("exam");
    answerRef
      .doc(examid)
      .set({
        ...answer,
      })
      .then(() => {
        dispatch({
          type: actions.postAnswer,
          isAnswerPosted: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.postAnswerErr,
          err: err,
        });
      });
  };
};
