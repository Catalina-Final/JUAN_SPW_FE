import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import PublicLayout from "../layouts/PublicLayout";
import ProfilePage from "../Admin/ProfilePage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={PublicLayout} />
      <PrivateRoute exact path="/dashboard" component={ProfilePage} />
    </Switch>
  );
};
export default Routes;
