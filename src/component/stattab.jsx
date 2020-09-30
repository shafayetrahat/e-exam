import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

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
class StatTab extends Component {
  render() {
    const classes = this.props;
    return (
      <Link to={"/statid/" + this.props.id} style={{ textDecoration: "none" }}>
        <Card
          className={classes.root}
          elevation={3}
          style={{ minWidth: "280px" }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" component="h2">
                {this.props.title}
              </Typography>
              <Typography variant="body2" component="p">
                <br />
                {this.props.time}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Link>
    );
  }
}

export default withStyles(useStyles)(StatTab);
