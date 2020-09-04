import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/favicon.svg";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/dashboard">
        <i className="fas fa-chart-line" /> Dashboard
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" /> Logout
      </Nav.Link>
    </Nav>
  );

  const loginWithFacebook = (response) => {
    console.log(response);
    dispatch(authActions.loginWithFacebook(response.accessToken));
  };

  const loginWithGoogle = (response) => {
    console.log("Google", response);
    dispatch(authActions.loginWithGoogle(response.accessToken));
  };

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        <i className="fas fa-registered" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <i className="fas fa-sign-in-alt" /> Login
      </Nav.Link>
      <FacebookLogin
        appId="355021229222362"
        autoLoad={false}
        fields="name,email,picture"
        callback={loginWithFacebook}
      />
      <GoogleLogin
        clientId="1058099593253-1gdouri8klivpfdo7lf0bvf7ff5fovaa.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={loginWithGoogle}
        onFailure={loginWithGoogle}
      />
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img src={logo} alt="SPW" width="50" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
