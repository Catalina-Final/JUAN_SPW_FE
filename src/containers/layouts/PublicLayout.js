import React from "react";
import { Switch, Route } from "react-router-dom";
import PageBlogs from "../PageBlogs";
import LoginPage from "../LoginPage";
import RegisterPage from "../ResgisterPage";
import NotFoundPage from "./NotFoundPage";
import AlertMsg from "./Alerts";
import PublicNavbar from "../PublicNavbar";
import BlogDetailPage from "../BlogDetailPage";
import EventDetailPage from "../EventDetailPage";
import PrivateRoute from "../Routes/PrivateRoutes";
import AddEditBlogPage from "../AddEditBlogPage";
import HomePage from "../HomePage";
import PageEvents from "../PageEvents";
import AddEditEventPage from "../AddEditEventPage";
import ProfilePage from "../ProfilePage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={ProfilePage} />
          <Route exact path="/blogs" component={PageBlogs} />
          <Route exact path="/events" component={PageEvents} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <Route exact path="/events/:id" component={EventDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute exact path="/event/add" component={AddEditEventPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          <PrivateRoute
            exact
            path="/event/edit/:id"
            component={AddEditEventPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    </>
  );
};

export default PublicLayout;
