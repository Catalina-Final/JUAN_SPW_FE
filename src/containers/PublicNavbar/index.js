import React from "react";
import "../../App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
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
    <Container fluid>
      <Nav className="m-auto navbar-light">
        <Nav.Link className="itemMenu" as={Link} to="/dashboard">
          <i className="fas fa-chart-line" /> Dashboard
        </Nav.Link>
        <Nav.Link className="itemMenu" as={Link} to="/blogs">
          <i className="fas fa-registered" /> Blog
        </Nav.Link>{" "}
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img src={logo} alt="SPW" width="170" height="70" />
        </Navbar.Brand>
        <Nav.Link className="itemMenu" as={Link} to="/events">
          <i className="fas fa-registered" /> Events
        </Nav.Link>
        <Nav.Link className="itemMenu" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" /> Logout
        </Nav.Link>
      </Nav>
    </Container>
  );

  const publicLinks = (
    <Container>
      <Nav className="m-auto">
        <Nav.Link className="itemMenu" as={Link} to="/blogs">
          <i className="fas fa-registered" /> Blog
        </Nav.Link>{" "}
        <Nav.Link className="itemMenu" as={Link} to="/events">
          <i className="fas fa-registered" /> Events
        </Nav.Link>{" "}
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img src={logo} alt="SPW" width="200" height="100" />
        </Navbar.Brand>
        <Nav.Link className="itemMenu" as={Link} to="/register">
          <i className="fas fa-registered" /> Register
        </Nav.Link>
        <Nav.Link as={Link} className="itemMenu" to="/login">
          <i className="fas fa-sign-in-alt" /> Login
        </Nav.Link>
      </Nav>
    </Container>
  );

  return (
    <Container>
      <Navbar className="navbar-dark m-auto" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto navbar-light"></Nav>
          {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default PublicNavbar;
