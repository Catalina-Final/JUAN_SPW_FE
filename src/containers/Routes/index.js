import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import DashboardPage from "../DashboardPage";
import PublicLayout from "../layouts/PublicLayout";

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
