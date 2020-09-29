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
import { authActions } from "../../redux/actions";
import { ClipLoader } from "react-spinners";
import PublicNavbar from "../PublicNavbar";
import EventsAdmin from "../../components/EventsAdmin";
// import BlogsAdmin from "../../components/BlogsAdmin";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatarUrl: currentUser.avatarUrl,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatarUrl } = formData;
    dispatch(authActions.updateProfile(name, avatarUrl));
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialBlog", "userAvatar"],
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

  return (
    <>
      <Container fluid>
        <PublicNavbar />
        <br />

        <Row>
          <Col className="d-flex justify-content-end align-items-start"></Col>
        </Row>
        <br />

        <Row>
          <Col className="text-center" md={4}>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <ClipLoader color="#f86c6b" size={150} loading={true} />
              </div>
            ) : (
              <Form className="text-center" onSubmit={handleSubmit}>
                <Col className="text-center" md={8}>
                  <div className="text-center">
                    {formData.avatarUrl && (
                      <div className="text-align-center mb-3">
                        <img
                          width="50%"
                          src={formData.avatarUrl}
                          className="avatar-lg"
                          alt="avatar"
                        />
                      </div>
                    )}
                    <h3>Personal Information</h3>
                  </div>
                </Col>
                <Form.Group className="text-center"></Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col md={6}>
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
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col md={6}>
                    <Form.Control
                      type="email"
                      required
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      disabled={true}
                    />
                    <Button
                      variant="info"
                      // className="btn-block w-50 "
                      onClick={uploadWidget}
                      disabled={!editable}
                    >
                      Edit avatar
                    </Button>
                    <Button
                      style={{ margin: "30px" }}
                      variant="primary"
                      onClick={() => setEditable(true)}
                    >
                      <FontAwesomeIcon icon="edit" size="1x" /> Edit
                    </Button>
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
                      <Button className="mr-3" type="submit" variant="primary">
                        Submit
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
                )}
              </Form>
            )}
          </Col>
          {/* <h1>History</h1> */}
          <Col className="d-flex justify-content-center " md={7}>
            {" "}
            <EventsAdmin />
          </Col>
          {/* <Col>
          <BlogsAdmin />
        </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
