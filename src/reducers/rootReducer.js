import authReducer from "./authReducer.js";
import userReducer from "./userReducer.js";
import examReducer from "./examReducer.js";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  exam: examReducer,
});

export default rootReducer;
