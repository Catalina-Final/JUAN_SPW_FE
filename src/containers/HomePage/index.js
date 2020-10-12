import React from "react";
import "../../App.css";
import { Carousel } from "react-bootstrap";
import First from "./imagesCover/coverImg1.jpg";
import Second from "./imagesCover/coverImg2.jpg";
import Third from "./imagesCover/coverImg3.jpg";
import Fourth from "./imagesCover/coverImg4.jpg";
import SectionsHomePage from "../../components/SectionsHomePage";
import PopularBlogs from "../../components/PopularBlogs";
import MagazineSection from "../MagazineSection";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block  w-100 " src={First} alt="First slide" />
          <Carousel.Caption>
            <h2>Photo Walks in Vietnam</h2>
            <h4>
              "Join us in a unique way to explore the city, take out your
              camera, comforable shoes and free mind!"
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Second} alt="Third slide" />

          <Carousel.Caption>
            <h2>Photography Workshops</h2>
            <h4>
              "Stuck witht the same photography style? time to learn, explore
              and go out of your comfort zone!".
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Third} alt="Third slide" />

          <Carousel.Caption>
            <h2>Events</h2>
            <h4>
              "Not sure what to do during the week? Art events around the city."
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Fourth} alt="Third slide" />

          <Carousel.Caption>
            <h2>Community</h2>
            <h4>
              "Share with thoudsands your precious work and get feedback."
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <SectionsHomePage />
      <PopularBlogs />
      <MagazineSection />
      <Footer />
    </>
  );
};

export default HomePage;
