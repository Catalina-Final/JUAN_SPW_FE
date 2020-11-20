import React from "react";
import "../App.css";
import { Col, Container, Row } from "react-bootstrap";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div id="footer" className="footer-bg text-white">
      <Container>
        <h1 className="footer-head">Contact</h1>
        <p>
          For more detail information do not hesitate to contact us on one of
          these channels
        </p>
        <Row>
          <Col md={6} className="contact-lst">
            <div className="contact-wrap">Juank060790@gmail.com</div>
            <br></br>
            <p>
              © Copyright <strong className="license">SPW 2020</strong> All
              Rights Reserve
            </p>
          </Col>

          <Col md={6} className="d-flex justify-content-center">
            <a
              href="https://www.facebook.com/saigonphotowalk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="reactionsIcons"
                icon={faFacebook}
                size="3x"
              />
              <FontAwesomeIcon
                className="reactionsIcons"
                icon={faGoogle}
                size="3x"
              />{" "}
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
