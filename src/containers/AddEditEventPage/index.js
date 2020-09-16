import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { eventActions } from "../../redux/actions";

const AddEditEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: null,
    eventType: "",
  });
  const loading = useSelector((state) => state.event.loading);
  const eventTypes = useSelector((state) => state.event.eventTypes);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedEvent = useSelector((state) => state.event.selectedEvent);
  const redirectTo = useSelector((state) => state.event.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";

  useEffect(() => {
    if (addOrEdit === "Edit") {
      setFormData((formData) => ({
        ...formData,
        title: selectedEvent.title,
        content: selectedEvent.content,
      }));
    }
  }, [addOrEdit, selectedEvent]);

  // get the list of types from api
  // update State
  useEffect(() => {
    dispatch(eventActions.getEventTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // const handleSelectCountry = (c) => {
  //   setFormData({
  //     ...formData,
  //     contactInfo: { ...formData.contactInfo, nationality: c },
  //   });
  // };

  // const handleChangeEventType = (eventType) => {
  //   setFormData({ ...formData, eventType: eventType });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images, eventType } = formData;
    if (addOrEdit === "Add") {
      dispatch(eventActions.createNewEvent(title, content, images, eventType));
    } else if (addOrEdit === "Edit") {
      dispatch(
        eventActions.updateEvent(selectedEvent._id, title, content, eventType)
      );
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    // TODO : popup confirmation modal
    dispatch(eventActions.deleteEvent(selectedEvent._id));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(eventActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(eventActions.setRedirectTo(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["SPW", "event images"],
      },
      function (error, result) {
        if (result && result.length) {
          setFormData({
            ...formData,
            images: result.map((res) => res.secure_url),
          });
        }
      }
    );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} Events</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              {formData?.images?.map((image) => (
                <img
                  src={image}
                  key={image}
                  width="90px"
                  height="60px"
                  alt="event images"
                ></img>
              ))}
              <Button variant="info" onClick={uploadWidget}>
                {addOrEdit} Images
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Control
                size="sm"
                as="select"
                value={formData.eventType}
                name="eventType"
                onChange={handleChange}
              >
                {eventTypes?.map((eventType) => (
                  <option value={eventType._id} key={eventType._id}>
                    {eventType.type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Event
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditEventPage;
