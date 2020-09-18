import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import sectionPic1 from "../containers/HomePage/imagesCover/homepagesection1.jpg";
import sectionPic2 from "../containers/HomePage/imagesCover/homepagesection2.jpg";

export default function SectionsHomePage() {
  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Row className="row align-items-stretch retro-layout">
          <Col md={5}>
            <div src={sectionPic2} height="500" alt="Section home page">
              {" "}
              <span className="">PhotoWalks</span>
              <div>
                <h2>
                  The largest community of photogaphers in Ho Chi Minh city.
                </h2>
              </div>
            </div>
          </Col>
          <Col md={7}>
            <img src={sectionPic1} height="250" alt="Section home page" />

            <div className="two-col d-block d-md-flex">
              hahahahaha
              <div className="text text-sm">Text on top of the image</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
