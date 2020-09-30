import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import AddExamTab from "./addexamtab.jsx";
import AddExam from "./addexam.jsx";
import { Grid } from "@material-ui/core";

class Admin extends Component {
  render() {
    const { auth, users, exams } = this.props;

    let user = null;
    if (users !== [] && users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }

    if (user && user.access === "default") {
      return <Redirect to="/home" />;
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    const examlist = exams ? (
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {exams.map((exam) => {
          let tempTime = new Date(exam.startTime.seconds * 1000);
          let time = tempTime.toLocaleDateString("en-GB", {
            hour: "numeric",
            hour12: true,
          });
          return (
            <Grid item md={4}>
              <AddExamTab
                key={exam.id}
                title={exam.title}
                description={exam.description}
                id={exam.id}
                className={exam.class}
                time={time}
              />
            </Grid>
          );
        })}
      </Grid>
    ) : (
      <div className="container">
        <h4>
          <Spinner />
        </h4>
      </div>
    );

    return (
      <>
        <AddExam />
        <div className="container-static">{examlist}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    exams: state.firestore.ordered.exams,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "exams",
    },
    {
      collection: "users",
      doc: props.auth.uid,
      storeAs: "users",
    },
  ])
)(Admin);
