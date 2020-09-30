import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CardActionArea,
  CardContent,
  Typography,
  withStyles,
  Card,
} from "@material-ui/core";

const useStyles = {
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
class AddExamTab extends Component {
  render() {
    const classes = this.props;
    return (
      <Link to={"/addexam/" + this.props.id} style={{ textDecoration: "none" }}>
        <Card
          className={classes.root}
          elevation={3}
          style={{ minWidth: "250px" }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Class {this.props.className}
              </Typography>
              <Typography variant="h5" component="h2">
                {this.props.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {this.props.description}
              </Typography>
              <Typography variant="body2" component="p">
                <br />
                {this.props.time}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    );
  }
}

export default withStyles(useStyles)(AddExamTab);
