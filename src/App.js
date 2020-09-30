import React, { Component } from "react";
import Navigation from "./component/nabar.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/homepage.jsx";
import Exam from "./component/exam.jsx";
import Admin from "./component/admin.jsx";
import Profile from "./component/userProfile.jsx";
import Stat from "./component/stat.jsx";
import ExamStat from "./component/examstat.jsx";
import HoldOn from "./component/holdOn.jsx";
import AddQuestion from "./component/addquestion.jsx";
import SignInSide from "./component/landingPage.jsx";
import ManageMembers from "./component/manageMembers.jsx";

class App extends Component {
  renderPage = () => {
    return (
      <Router>
        <div className="App">
          <Navigation />
        </div>
        <Switch>
          <Route path="/addexam/:examId" component={AddQuestion} />
          <Route path="/holdon" component={HoldOn} />
          <Route path="/statid/:examId" component={ExamStat} />
          <Route path="/stat" component={Stat} />
          <Route path="/admin" component={Admin} />
          <Route path="/home" component={Home} />
          <Route path="/exam/:examId" component={Exam} />
          <Route path="/managemembers" component={ManageMembers} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={SignInSide} />
        </Switch>
      </Router>
    );
  };

  render() {
    return this.renderPage();
  }
}
export default App;
