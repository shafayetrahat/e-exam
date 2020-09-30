import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Form, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { postAnswer } from "../actions/postAnsweractions";
import Countdown from "react-countdown-now";
import { Typography } from "@material-ui/core";

class Exam extends Component {
  state = {
    id: null,
    answers: [],
    isActive: false,
    startTime: null,
  };
  componentDidMount() {
    let id = this.props.match.params.examId;
    this.setState({
      id: id,
    });
  }

  componentDidUpdate(prevProps) {
    let startTime = null;
    let endTime = null;
    if (this.props.exams) {
      startTime = this.props.exams.map((exam) => {
        return exam.startTime;
      });
    }
    if (this.props.exams !== prevProps.exams) {
      this.setState({
        startTime: startTime,
      });
    }
    //#######
    if (this.props.exams) {
      endTime = this.props.exams.map((exam) => {
        return exam.endTime;
      });
    }
    if (this.props.exams !== prevProps.exams) {
      this.setState({
        endTime: endTime,
      });
    }

    if (this.state.endTime) {
      this.state.endTime.map((time) => {
        // console.log(time.seconds * 1000);
        // console.log(new Date().getTime());
        let timenow = new Date().getTime();
        let timesec = time.seconds * 1000;

        if (+timenow > +timesec) {
          this.props.history.push("/home");
        }
        return time;
      });
    }

    // console.log(this.state.startTime);
    // console.log(this.state.endTime);
  }
  handleClick = (id, e) => {
    const target = e.target;
    let value = target.value;
    let temp = this.state.answers;
    // console.log(this.state);
    if (target.checked) {
      temp[parseInt(id)] = value;
      this.setState({
        answers: temp,
      });
    }
  };
  handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(this.state);
    this.props.postAnswer(
      this.state.answers,
      this.props.auth.uid,
      this.state.id
    );
    this.props.history.push("/home");
  };
  handleAble = (event) => {
    let isActive = event.target.checked;
    this.setState({ isActive: isActive });
    // console.log(this.state.isActive);
  };
  render() {
    const { auth, questions } = this.props;

    // console.log(Date.now());
    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    const questionComponent = questions ? (
      questions.map((type) => {
        const options = type.options.map((option, index) => {
          return (
            <Form.Check
              key={index}
              type="radio"
              name={type.id}
              label={option}
              value={option}
              id={index}
              onChange={(e) => this.handleClick(type.id, e)}
            />
          );
        });
        return (
          <>
            <div key={type.id} className="mb-3">
              <Typography>
                Q#. {type.id}. {type.question}
              </Typography>
              <Typography>{options}</Typography>
            </div>
          </>
        );
      })
    ) : (
      <div className="container-static">
        <Spinner />
      </div>
    );
    return this.state.startTime ? (
      <div className="container-static" style={{ padding: 50 }}>
        <Countdown
          date={this.state.startTime.map((second) => {
            return second.seconds * 100;
          })}
        >
          {/* <h1>Exam id is {this.state.id}</h1> */}
          <Form onSubmit={this.handleSubmit}>
            <Row
              style={{ float: "right", marginRight: 5 }}
              className="float-right"
            >
              <h3>
                <Countdown
                  date={this.state.endTime.map((second) => {
                    return second.seconds * 100;
                  })}
                  onComplete={this.handleSubmit}
                ></Countdown>
              </h3>
            </Row>
            <Typography align="center" variant="h5" color="error">
              Answer All the question
            </Typography>
            {questionComponent}
            <br />
            <br />
            <Row>
              <div className="col-sm-1">
                <Form.Check
                  onChange={(event) => this.handleAble(event)}
                ></Form.Check>
              </div>
              <div className="col-sm-11">
                I understand that submitting work that isn’t mine may result in
                failure of this exam or deactivation of my account.
              </div>
            </Row>
            <Row>
              {this.state.isActive ? (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              ) : (
                <Button disabled>Submit </Button>
              )}
            </Row>
          </Form>
        </Countdown>
      </div>
    ) : (
      <Spinner>Loading.....</Spinner>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    questions: state.firestore.ordered.questions,
    exams: state.firestore.ordered.exams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postAnswer: (answer, uid, examid) =>
      dispatch(postAnswer(answer, uid, examid)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "questions",
      doc: props.match.params.examId,
      subcollections: [{ collection: props.match.params.examId }],
      storeAs: "questions",
      orderBy: "id",
    },
    {
      collection: "exams",
      storeAs: "exams",
      where: [["id", "==", props.match.params.examId]],
    },
  ])
)(Exam);
