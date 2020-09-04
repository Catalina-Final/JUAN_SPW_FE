import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import RegisterPage from "../ResgisterPage";
import { Container } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./Alerts";
import PublicNavbar from "../PublicNavbar";
import BlogDetailPage from "../BlogDetailPage";
import PrivateRoute from "../Routes/PrivateRoutes";
import AddEditBlogPage from "../AddEditBlogPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <Route component={NotFoundPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
