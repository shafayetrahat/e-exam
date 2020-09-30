import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { createExam } from "../actions/postExamActions";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class AddExam extends Component {
  state = {
    show: false,
    class: null,
    description: null,
    id: null,
    endTime: null,
    startTime: null,
    title: null,
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
  handleStartDate = (date) => {
    this.setState({
      startTime: date,
    });
  };
  handleEndDate = (date) => {
    this.setState({
      endTime: date,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.createExam(this.state);
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
          style={{ right: 20, position: "fixed", outline: "none" }}
        >
          <AddIcon />
          Add Exam
        </Fab>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Exam</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Exam Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Exam Title"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="class">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Class"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description of the exam"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <DatePicker
                  selected={this.state.startTime}
                  onChange={this.handleStartDate}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </Form.Group>
              <Form.Group controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <DatePicker
                  selected={this.state.endTime}
                  onChange={this.handleEndDate}
                  showTimeSelect
                  dateFormat="Pp"
                />
              </Form.Group>
              <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter id of the exam"
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
    createExam: (exam) => dispatch(createExam(exam)),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  };
};
export default compose(
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
)(AddExam);
