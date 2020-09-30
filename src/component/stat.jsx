import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import StatTab from "./stattab";
import { Grid } from "@material-ui/core";

class Stat extends Component {
  render() {
    const { auth, exams, users } = this.props;
    if (auth === undefined) {
      return <Redirect to="/" />;
    }
    if (!this.props.auth.uid) {
      return <Redirect to="/" />;
    }
    let user = null;
    if (users !== [] && users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }
    // console.log(user);
    if (user && user.access === null) {
      return <Redirect to="/holdon" />;
    }
    if (user && user.access === "admin") {
      return <Redirect to="/admin" />;
    }
    const examlist = exams ? (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {exams.map((exam) => {
          return (
            <Grid item md={4}>
              <StatTab
                key={exam.id}
                title={exam.title}
                description={exam.description}
                id={exam.id}
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
    return <div className="container-static">{examlist}</div>;
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    exams: state.firestore.ordered.exams,
    auth: state.firebase.auth,
    userans: state.firestore.ordered.userans,
    users: state.firestore.ordered.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return []; //this one is the redux problem if there is no uid no doc is created
    return [
      {
        collection: "users",
        doc: props.auth.uid,
        storeAs: "users",
      },
      {
        collection: "users",
        doc: props.auth.uid,
        subcollections: [{ collection: "exam" }],
        storeAs: "userans",
      },
      {
        collection: "exams",
        storeAs: "exams",
      },
    ];
  })
)(Stat);
