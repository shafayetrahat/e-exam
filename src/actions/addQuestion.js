import * as actions from "./actiontypes.js";

export const createQuestion = (question, id) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    console.log(id, question);
    const firestore = getFirebase().firestore();
    firestore
      .collection("questions")
      .doc(id)
      .collection(id)
      .doc(question.id)
      .set({
        ...question,
      })
      .then(() => {
        dispatch({
          type: actions.postQuestion,
          question: question,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.postQuestionErr,
          err: err,
        });
      });
  };
};
