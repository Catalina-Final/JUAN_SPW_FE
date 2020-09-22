import React from "react";
import "../App.css";
import { Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div id="footer" className="footer-bg text-white">
      <div className="container footer-container">
        <h1 className="footer-head">Contact</h1>
        <p>
          For more detail information do not hesitate to send me or reach me
          direct on one of these channels
        </p>
        <div md={8}>
          <Col md={6} className="contact-lst">
            <div className="contact-wrap">
              <p className="contact-head"></p>
              <p className="contact-infor">Gmail: juank060790@gmail.com</p>
            </div>
          </Col>

          <Col md={6} className="contact-icons col-md-6"></Col>
          <p>
            © Copyright <strong className="license">SPW 2020</strong>. All
            Rights Reserve
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
