import React, { Component } from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { CardContent, Typography, Card, Button } from "@material-ui/core";
import { approveUser } from "../actions/approveUser.js";
import { deleteUser } from "../actions/deleteUser.js";
import { compose } from "redux";
import { connect } from "react-redux";

class ManageMemberTab extends Component {
  handleApprove = (Id) => {
    this.props.approveUser(Id);
  };
  handleDelete = (Id) => {
    this.props.deleteUser(Id);
  };
  render() {
    return (
      <Card
        elevation={3}
        style={{ minWidth: "250px", padding: 5 }}
        key={this.props.keyo}
      >
        <CardContent>
          <Typography color="primary" gutterBottom>
            {this.props.userName}
          </Typography>
          <Typography>Has sent a request for approval.</Typography>
        </CardContent>

        <Button
          aria-label="approve"
          style={{ outline: "none" }}
          onClick={() => this.handleApprove(this.props.keyo)}
        >
          <CheckCircleOutlineIcon />
          <Typography>Approve request</Typography>
        </Button>
        <Button
          aria-label="delete"
          style={{ outline: "none" }}
          onClick={() => this.handleDelete(this.props.keyo)}
        >
          <DeleteIcon />
          <Typography color="error">Delete request</Typography>
        </Button>
      </Card>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    approveUser: (Id) => dispatch(approveUser(Id)),
    deleteUser: (Id) => dispatch(deleteUser(Id)),
  };
};
export default compose(connect(null, mapDispatchToProps))(ManageMemberTab);
