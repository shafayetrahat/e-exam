import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Button, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { createUser } from "../actions/userprofileActions";
import { Redirect, withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";

class Profile extends Component {
  state = {
    userName: null,
    class: null,
    access: null,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createUser(this.state, this.props.auth.uid);
  };
  render() {
    const { auth, users } = this.props;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    let user = null;
    if (users !== [] && users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }
    console.log(user);
    if (user) {
      if (user.userName) {
        return <Redirect to="/home" />;
      }
    }
    return (
      <div className="container">
        <div
          className="container container-fluid card"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "60vh",
          }}
        >
          <Typography color="secondary">
            Please provide you Full Name ans Class
          </Typography>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Name"
                  id="userName"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Row>
            <br />
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder="Class"
                  id="class"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Row>
            <br />
            <Row className="center">
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user, uid) => dispatch(createUser(user, uid)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "users",
      doc: props.auth.uid,
      storeAs: "users",
    },
  ]),
  withRouter
)(Profile);
