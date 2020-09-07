import React from "react";
import "../../App.css";
import { Carousel } from "react-bootstrap";
import First from "./imagesCover/coverImg1.jpg";
import Second from "./imagesCover/coverImg2.jpg";
import Third from "./imagesCover/coverImg3.jpg";
import Fourth from "./imagesCover/coverImg4.jpg";

const HomePage = () => {
  return (
    <div className="carouselCover">
      <Carousel style={{ width: "100%", margin: "5%" }}>
        <Carousel.Item>
          <img className="d-block  w-100" src={First} alt="First slide" />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Second} alt="Third slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Third} alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Fourth} alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePage;
