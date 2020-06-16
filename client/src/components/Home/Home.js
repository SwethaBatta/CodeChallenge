import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import SubmissionForm from "../SubmissionForm/SubmissionForm";
import CompanyCost from "../CompanyCostPage/CompanyCostPage";
import "./Home.scss";

class GameonHome extends Component {
  render() {
    return (
      <div className="home">
        <HashRouter>
          <div className="w3-row home">
            <ul className="home-nav">
              <li>
                <NavLink
                  exact
                  to="/"
                  activeClassName="selected"
                  activeStyle={{ borderBottom: "solid 3px #0062ff" }}
                >
                  Submission Form
                </NavLink>
              </li>
              <li>
                <NavLink to="/CompanyDetails" activeClassName="selected">
                  Company Details
                </NavLink>
              </li>
            </ul>
            <div className="content">
              <Route exact path="/" component={SubmissionForm} />
              <Route path="/CompanyDetails" component={CompanyCost} />
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default GameonHome;
