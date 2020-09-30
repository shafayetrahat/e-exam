import React, { Component } from "react";
import ExamTab from "./examtab";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";

class Home extends Component {
  render() {
    // const classes = this.props;
    const { exams, auth, users } = this.props;
    let user = null;
    if (users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }

    console.log(user);
    if (user === null) {
      return <Redirect to="/profile" />;
    }
    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    if (user !== undefined && user !== null && user.userName === null) {
      return <Redirect to="/profile" />;
    }

    if (user !== undefined && user !== null && user.access === "admin") {
      return <Redirect to="/admin" />;
    }
    if (user !== undefined && user !== null && user.access === null) {
      return <Redirect to="/holdon" />;
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
            <Grid item xs>
              <ExamTab
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
      <div className="container-static">
        <h4>
          <Spinner />
        </h4>
      </div>
    );
    return <div className="container-static">{examlist}</div>;
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    exams: state.firestore.ordered.exams,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};

const enhance = compose(
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
);
export default enhance(Home);
