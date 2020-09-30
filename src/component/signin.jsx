// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../config.js";
import { Typography } from "@material-ui/core";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/profile",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      defaultCountry: "BD",
    },
  ],
};

class SignInScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <Typography variant="h6" color="primary">
          Sign In
        </Typography>
        <br />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </React.Fragment>
    );
  }
}

export default SignInScreen;
