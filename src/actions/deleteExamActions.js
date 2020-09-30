import * as actions from "./actiontypes.js";

export const createExam = (exam) => {
  return (dispatch, getState, { getFirebase }) => {
    //I can dispatch any actions
    const firestore = getFirebase().firestore();
    firestore
      .collection("exams")
      .add({
        ...exam,
      })
      .then(() => {
        dispatch({
          type: actions.post_exam,
          exam: exam,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.post_exam_err,
          err: err,
        });
      });
  };
};
