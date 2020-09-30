export const addAnswer = (qid, examid, answer) => {
  console.log(qid, examid, answer);
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("answer")
      .doc(examid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          firestore
            .collection("answer")
            .doc(examid)
            .update({
              [qid]: answer,
            })
            .then(() => {
              dispatch({
                type: "ADDED_ANSWER",
                success: "200",
              });
            })
            .catch((err) => {
              dispatch({
                type: "ADD_ANSWER_ERR",
                err: err,
              });
            });
        } else {
          firestore
            .collection("answer")
            .doc(examid)
            .set({
              [qid]: answer,
            })
            .then(() => {
              dispatch({
                type: "ADDED_ANSWER",
                success: "200",
              });
            })
            .catch((err) => {
              dispatch({
                type: "ADD_ANSWER_ERR",
                err: err,
              });
            });
        }
      });
  };
};
