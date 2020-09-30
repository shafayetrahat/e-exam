import React, { Component } from "react";
import Backdrop from "../backdrop.jpg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const divStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Backdrop})`,
  backgroundSize: "cover",
};

class Background extends Component {
  render() {
    const { auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/home" />;
    }
    return <img src={Backdrop} style={divStyle} alt="" />;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(Background);
