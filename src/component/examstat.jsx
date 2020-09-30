import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class ExamStat extends Component {
  render() {
    // console.log(this.props);
    const { correctans, userans } = this.props;
    let correctAns = null;
    let userAns = null;
    if (correctans !== [] && correctans !== undefined) {
      correctans.map((ans) => {
        correctAns = ans;
        return ans;
      });
    }
    if (userans !== [] && correctans !== undefined) {
      userans.map((ans) => {
        userAns = ans;
        return ans;
      });
    }

    let count = 0;
    let size = 0;
    let percentage = 0;
    console.log(correctAns, userAns);
    if (
      correctAns !== undefined &&
      correctAns !== null &&
      correctAns !== {} &&
      userAns !== undefined &&
      userAns !== null &&
      userAns !== {}
    ) {
      let temp = Object.keys(correctAns);
      console.log(temp);
      if (temp !== null && temp !== undefined && temp !== {}) {
        temp.forEach(function (key) {
          if (key !== "id") {
            console.log(correctAns[key], userAns[key]);
            if (correctAns[key] === userAns[key]) {
              console.log(correctAns[key], userAns[key]);
              count = ++count;
            }
            size = ++size;
          }
          console.log(count, size);
        });
      }
    }
    if (correctAns !== null && correctAns !== undefined) {
      percentage = ((count / size) * 100).toFixed(2);
    } else {
      percentage = 0;
    }
    console.log(correctAns, userAns, percentage);

    return userAns !== null
      ? [
          <div className="container">
            <h4>You got {percentage} % in this exam.</h4>
          </div>,
        ]
      : [
          <div className="container-static">
            <h4>Your Stat is not available for this exam.</h4>
          </div>,
        ];
  }
}

const mapStateToProps = (state) => {
  // console.log(state);

  return {
    auth: state.firebase.auth,
    userans: state.firestore.ordered.userans,
    correctans: state.firestore.ordered.correctans,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "users",
      doc: props.auth.uid,
      subcollections: [{ collection: "exam", doc: props.match.params.examId }],
      storeAs: "userans",
    },
    {
      collection: "answer",
      doc: props.match.params.examId,
      storeAs: "correctans",
    },
  ])
)(ExamStat);
