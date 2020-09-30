import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import "../App.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteQuestion } from "../actions/deleteQuestion.js";

import {
  Card,
  Typography,
  Grid,
  withStyles,
  CardContent,
  IconButton,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import AddQuestionModal from "./addquestionmodal.jsx";
import AddAnswer from "./addAnswer.jsx";
import { Row } from "react-bootstrap";
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
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class AddQuestion extends Component {
  handleDelete = (eid, id) => {
    this.props.deleteQuestion(eid, id);
  };
  render() {
    const classes = this.props;
    const eid = this.props.match.params.examId;
    const { auth, questions, users, answer } = this.props;
    console.log(auth, questions, answer);
    let user = null;
    let ans = null;
    if (users !== [] && users !== undefined) {
      users.map((id) => {
        user = id;
        return id;
      });
    }
    if (answer !== [] && answer !== undefined) {
      answer.map((id) => {
        ans = id;
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

    if (!auth.uid) {
      return <Redirect to="/" />;
    }
    const questionsList = questions
      ? [
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {questions.map((question, index) => {
              const optionq = question.options.map((option, index) => {
                return (
                  <span key={index}>
                    {index + 1}&nbsp;.&nbsp;{option}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                );
              });
              return (
                <Grid item md={4}>
                  <Card
                    className={classes.root}
                    elevation={3}
                    style={{ minWidth: "280px" }}
                  >
                    <CardContent>
                      <Typography>
                        {index + 1 + "."}&nbsp;&nbsp;{question.question}
                      </Typography>

                      <Typography>{optionq}</Typography>
                      <Typography>
                        Answer:{ans ? [ans[question.id]] : null}
                      </Typography>
                      <Row>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => this.handleDelete(eid, question.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <div className="col-sm-4"></div>
                        <AddAnswer
                          qid={question.id}
                          examid={this.props.match.params.examId}
                        />
                      </Row>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>,
        ]
      : null;
    return (
      <>
        <AddQuestionModal eid={this.props.match.params.examId} />
        <div className="container-static">{questionsList}</div>
      </>
    );
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    deleteQuestion: (eid, id) => dispatch(deleteQuestion(eid, id)),
  };
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    questions: state.firestore.ordered.questions,
    answer: state.firestore.ordered.answer,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDisPatchToProps),
  firestoreConnect((props) => [
    {
      collection: "questions",
      doc: props.match.params.examId,
      subcollections: [{ collection: props.match.params.examId }],
      storeAs: "questions",
      orderBy: "id",
    },
    {
      collection: "answer",
      doc: props.match.params.examId,
      storeAs: "answer",
    },
    {
      collection: "users",
      doc: props.auth.uid,
      storeAs: "users",
    },
  ])
)(AddQuestion);
