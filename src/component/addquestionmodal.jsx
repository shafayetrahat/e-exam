import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { createQuestion } from "../actions/addQuestion.js";
import { Fab, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(3),
      minheight: theme.spacing(16),
    },
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
});
class AddQuestionModal extends Component {
  state = {
    show: false,
    options: [],
    question: null,
    id: null,
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state, this.props.eid);

    this.props.createQuestion(this.state, this.props.eid);
  };
  handleTags = (options) => {
    this.setState({ options });
  };
  render() {
    return (
      <>
        <Fab
          size="small"
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={this.handleShow}
          style={{ right: 20, position: "fixed" }}
        >
          <AddIcon />
          Add Question
        </Fab>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Question"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="options">
                <Form.Label>Options</Form.Label>
                <TagsInput
                  value={this.state.options}
                  onChange={this.handleTags}
                />
              </Form.Group>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter id of the question"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    createQuestion: (question, id) => dispatch(createQuestion(question, id)),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};
export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDisPatchToProps),
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
)(AddQuestionModal);
