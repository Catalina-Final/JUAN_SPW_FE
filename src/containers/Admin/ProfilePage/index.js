import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authActions } from "../../../redux/actions";
import { ClipLoader } from "react-spinners";
import PublicNavbar from "../../PublicNavbar";
import EventsAdmin from "../../../components/EventsAdmin";
import BlogsAdmin from "../../../components/BlogsAdmin";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import FriendListPage from "../FriendListPage.js";
// import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
    avatarUrl: currentUser?.avatarUrl,
    coverUrl: currentUser?.coverUrl,
    facebook: currentUser?.facebook,
    instagram: currentUser?.instagram,
    portfolioUrl: currentUser?.portfolioUrl,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatarUrl, coverUrl, facebook, instagram, portfolioUrl } =
      formData;

    dispatch(
      authActions.updateProfile(
        name,
        avatarUrl,
        coverUrl,
        facebook,
        instagram,
        portfolioUrl
      )
    );
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const uploadProfileWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET_PROFILE,
        folder: "widgetUpload",
        tags: ["socialBlog", "userAvatar"],
        cropping: true,
      },
      function (error, result) {
        if (error) console.log(error);
        if (result && result.length && !error) {
          setFormData({
            ...formData,
            avatarUrl: result[0].secure_url,
          });
        }
      }
    );
  };

  const uploadCoverWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialBlog", "userCover"],
      },
      function (error, result) {
        if (error) console.log(error);
        if (result && result.length && !error) {
          setFormData({
            ...formData,
            coverUrl: result[0].secure_url,
          });
        }
      }
    );
  };

  return (
    <>
      <Container fluid>
        <PublicNavbar />

        <div className="text-center">
          <img
            width="100%"
            height="50%"
            src={formData?.coverUrl}
            alt="coverImage user"
          ></img>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <ClipLoader color="#f86c6b" size={150} loading={true} />
          </div>
        ) : (
          <Row>
            <Col lg={4} md={5} sm={12} xs={12}>
              <div className="PersonalInfoContainer">
                <div className="PersonalInfoContainerInner">
                  {!editable ? (
                    <div className="text-center">
                      <h3 className="text-center">Personal Information</h3>
                      <div className="personalInfo">
                        <div className="text-center avatarContainer mb-3">
                          <img
                            src={formData.avatarUrl}
                            className="avatar-lg"
                            alt="avatar"
                          />
                        </div>
                        <div className="text-center">
                          <a
                            className="linkPersonalinfo"
                            href={formData.portfolioUrl}
                            target="_new"
                          >
                            {formData.portfolioUrl}{" "}
                          </a>
                          <h5 className="linkPersonalinfo"> {formData.name}</h5>
                          <h5 className="linkPersonalinfo">{formData.email}</h5>

                          <div className="d-flex justify-content-center">
                            <div>
                              <a href={formData.facebook} target="_new">
                                <FontAwesomeIcon
                                  className="reactionsIcons"
                                  icon={faFacebook}
                                  size="2x"
                                />
                              </a>
                            </div>
                            <div>
                              <a href={formData.instagram} target="_new">
                                {" "}
                                <FontAwesomeIcon
                                  className="reactionsIcons"
                                  icon={faInstagram}
                                  size="2x"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="personalInfo logoColor"
                          variant="primary"
                          onClick={(ScrollToTop) => setEditable(true)}
                        >
                          <FontAwesomeIcon icon={faPortrait} size="1x" /> Edit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Form className="text-center" onSubmit={handleSubmit}>
                      <Col md={12}>
                        <div className="text-center avatarContainer">
                          {formData.avatarUrl && (
                            <div className=" text-center m-auto">
                              <img
                                src={formData.avatarUrl}
                                className="avatar-lg"
                                alt="avatar"
                              />
                            </div>
                          )}
                          <h3>Personal Information</h3>
                        </div>
                        <Form.Group as={Row}>
                          <Form.Label column sm="3">
                            Name
                          </Form.Label>
                          <Col md={12}>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              disabled={!editable}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="3">
                            facebook{" "}
                          </Form.Label>
                          <Col md={12}>
                            <Form.Control
                              type="text"
                              required
                              placeholder="facebook"
                              name="facebook"
                              value={formData.facebook}
                              onChange={handleChange}
                              disabled={!editable}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="3">
                            Instagram
                          </Form.Label>
                          <Col md={12}>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Instagram Link"
                              name="instagram"
                              value={formData.instagram}
                              onChange={handleChange}
                              disabled={!editable}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="3">
                            Portfolio Link
                          </Form.Label>
                          <Col md={12}>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Portfolio Link"
                              name="portfolioUrl"
                              value={formData.portfolioUrl}
                              onChange={handleChange}
                              disabled={!editable}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="3">
                            Email
                          </Form.Label>
                          <Col md={12}>
                            <Form.Control
                              type="email"
                              required
                              placeholder="Email"
                              name="email"
                              value={formData.email}
                              disabled={true}
                            />
                            <Row className="editavatarcoverbtn text-right">
                              <Button
                                className="m-2"
                                variant="info"
                                // className="btn-block w-50 "
                                onClick={uploadProfileWidget}
                                disabled={!editable}
                              >
                                Edit avatar
                              </Button>
                              <Button
                                className="m-2"
                                variant="info"
                                // className="btn-block w-50 "
                                onClick={uploadCoverWidget}
                                disabled={!editable}
                              >
                                Edit Cover
                              </Button>
                            </Row>
                          </Col>
                        </Form.Group>
                        <br />
                        {editable && (
                          <ButtonGroup className="d-flex mb-3">
                            {loading ? (
                              <Button
                                className="mr-3"
                                variant="primary"
                                type="button"
                                disabled
                              >
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Submitting...
                              </Button>
                            ) : (
                              <Button
                                className="mr-3"
                                type="submit"
                                variant="success"
                              >
                                Save
                              </Button>
                            )}
                            <Button
                              variant="light"
                              onClick={handleCancel}
                              disabled={loading}
                            >
                              Cancel
                            </Button>
                          </ButtonGroup>
                        )}{" "}
                      </Col>
                    </Form>
                  )}
                </div>
              </div>
            </Col>
            {/* <h1>History</h1> */}
            <Col lg={7} md={6} sm={12} xs={12}>
              <Row>
                <EventsAdmin />
              </Row>
              <Row>
                <BlogsAdmin />
              </Row>
            </Col>
          </Row>
        )}
      </Container>
      <FriendListPage />
    </>
  );
};

export default ProfilePage;
