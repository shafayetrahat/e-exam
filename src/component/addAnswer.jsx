import React, { Component } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Modal, Form } from "react-bootstrap";
import { addAnswer } from "../actions/addAnswer.js";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddAnswer extends Component {
  state = {
    show: false,
    answer: null,
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
    this.props.addAnswer(this.props.qid, this.props.examid, this.state.answer);
    this.setState({
      show: false,
    });
    // console.log(this.state, this.props.qid, this.props.examid);
    // this.props.createQuestion(this.state, this.props.eid);
  };
  render() {
    return (
      <>
        <Button variant="contained" color="primary" onClick={this.handleShow}>
          <AddIcon />
          Add Answer
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Answer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="answer">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Question"
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
    addAnswer: (qid, examid, answer) =>
      dispatch(addAnswer(qid, examid, answer)),
  };
};
export default compose(
  connect(null, mapDisPatchToProps),
  firestoreConnect((props) => [
    {
      collection: "answer",
      doc: props.examid,
    },
  ])
)(AddAnswer);
