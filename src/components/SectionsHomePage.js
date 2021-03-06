import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import sectionPic2 from "../containers/HomePage/imagesCover/homepagesection7.jpg";
import sectionPic1 from "../containers/HomePage/imagesCover/homepagesection2.jpg";
import sectionPic3 from "../containers/HomePage/imagesCover/homepagesection4.jpg";
import sectionPic4 from "../containers/HomePage/imagesCover/homepagesection5.jpg";
import "../App.css";
import { useHistory } from "react-router-dom";

export default function SectionsHomePage() {
  const history = useHistory();

  // const handleClickCommunitySection = () => {
  //   history.push(`#`);
  // };

  const handleClickEventSection = () => {
    history.push(`/events`);
  };

  const handleClickBlogSection = () => {
    history.push(`/blogs`);
  };

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Row className="section2">
          <Col
            className="ImageSection1 OnHover"
            md={4}
            onClick={handleClickBlogSection}
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${sectionPic1})`,
              minHeight: "500px",
            }}
          >
            <div>
              <Badge className="PhotoWalkSectionTags" variant="danger">
                PhotoWalks
              </Badge>

              <div>
                <h2 className="PhotoWalkSectionText">
                  Join us in a different way to explore your city.
                </h2>
              </div>
            </div>
          </Col>

          <Col className="ColResponsiveSections" md={8} sm={10}>
            <div
              onClick={handleClickBlogSection}
              className="CommunitysectionBlock ImageSection1 OnHover "
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${sectionPic2})`,
                backgroundSize: "cover",
              }}
            >
              <Badge className="PhotoWalkSectionTags" variant="warning">
                Community
              </Badge>

              <h2 className="CommunitySectionText ">
                The most active community of photogaphers in Ho Chi Minh city.
              </h2>
            </div>

            <div className=" sectionBlock d-block d-md-flex">
              <div
                onClick={handleClickEventSection}
                style={{
                  height: "95%",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `url(${sectionPic3})`,
                  backgroundSize: "cover",
                  marginRight: "10px",
                }}
                className="ImageSection1 OnHover EventSection"
              >
                <Badge className="PhotoWalkSectionTags " variant="success">
                  Events
                </Badge>

                <h2 className="CommunitySectionText ">
                  A great way to learn from others, art events in Saigon.
                </h2>
              </div>

              <div
                onClick={handleClickBlogSection}
                style={{
                  height: "95%",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `url(${sectionPic4})`,
                  backgroundSize: "cover",
                }}
                className="ImageSection1 OnHover"
              >
                <Badge className="PhotoWalkSectionTags " variant="primary">
                  Blog
                </Badge>

                <h2 className="CommunitySectionText ">
                  Share your experiences and knowledge with the community.
                </h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
