import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import ManageMemberTab from "./managemembertab.jsx";
import { Spinner } from "react-bootstrap";

class ManageMembers extends Component {
  state = {};

  render() {
    const { auth, users, allusers } = this.props;

    let user = null;
    if (users !== [] && users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }

    if (user !== null && user.access === "default") {
      return <Redirect to="/home" />;
    }
    if (user !== null && user.access === null) {
      return <Redirect to="/home" />;
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    const userlist = allusers ? (
      <Grid
        container
        spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        {allusers.map((user) => {
          // console.log(user.id);
          return (
            <Grid item>
              <ManageMemberTab keyo={user.id} userName={user.userName} />
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
        <div className="container-static">{userlist}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allusers: state.firestore.ordered.allusers,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "users",
      where: [["access", "==", null]],
      storeAs: "allusers",
    },
    {
      collection: "users",
      doc: props.auth.uid,
      storeAs: "users",
    },
  ])
)(ManageMembers);
