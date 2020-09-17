import React from "react";
import "../../App.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/SPW logo.png";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/actions";

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
      <Nav.Link as={Link} to="/blogs">
        <i className="fas fa-registered" /> Blog
      </Nav.Link>{" "}
      <Nav.Link as={Link} to="/events">
        <i className="fas fa-registered" /> Events
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <i className="fas fa-sign-out-alt" /> Logout
      </Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav className="navBar">
      <Nav.Link as={Link} to="/blogs">
        <i className="fas fa-registered" /> Blog
      </Nav.Link>{" "}
      <Nav.Link as={Link} to="/events">
        <i className="fas fa-registered" /> Events
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        <i className="fas fa-registered" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <i className="fas fa-sign-in-alt" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar className="navBar" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mr-auto">
        <img src={logo} alt="SPW" width="150" height="80" />
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
