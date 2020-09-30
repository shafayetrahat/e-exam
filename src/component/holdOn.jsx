import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

class HoldOn extends Component {
  render() {
    const { auth, users } = this.props;

    let user = null;
    if (users !== [] && users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }
    if (user && user.access === "admin") {
      return <Redirect to="/admin" />;
    }
    // console.log(user);
    if (user && user.access === "default") {
      return <Redirect to="/home" />;
    }

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container container-fluid">
        <h4>You are on hold. Please contact to your teacher</h4>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "users",
      doc: props.auth.uid,
      storeAs: "users",
    },
  ])
)(HoldOn);
