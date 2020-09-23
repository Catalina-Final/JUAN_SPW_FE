import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import PublicLayout from "../layouts/PublicLayout";
import ProfilePage from "../ProfilePage";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={ProfilePage} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
