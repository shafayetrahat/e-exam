import * as actions from "../actions/actiontypes.js";
const initState = {
  exams: [],
};

const examReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.post_exam:
      // console.log("created", action.exam);
      return state;
    case actions.post_exam_err:
      // console.log("error in ", action.err);
      return state;
    default:
      return state;
  }
};

export default examReducer;
