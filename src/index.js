import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import AdoptPage from "./views/AdoptPage/AdoptPage";
import PetProfilePage from "./views/PetProfilePage/PetProfilePage";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login-page" component={LoginPage} />
        <Route exact path="/register-page" component={RegisterPage} />
        <Route exact path="/adopt-page" component={AdoptPage} />
        <ProtectedRoute exact path="/pet-profile-page" component={PetProfilePage} />
        <ProtectedRoute exact path="/profile-page" component={ProfilePage} />
        <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
