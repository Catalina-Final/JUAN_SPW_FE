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
import TimePicker from "react-bootstrap-time-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: null,
    eventType: "",
    date: "",
    startHour: "",
    endHour: "",
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
        images: selectedEvent.images,
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

  const handleChangeStartTime = (time) => {
    const dateTime = new Date(time * 1000).toISOString().substr(11, 8);
    setFormData({
      ...formData,
      startHour: dateTime,
    });
  };

  const handleChangeEndTime = (time) => {
    const dateTime = new Date(time * 1000).toISOString().substr(11, 8);
    setFormData({
      ...formData,
      endHour: dateTime,
    });
  };

  const handleChangeDate = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addOrEdit === "Add") {
      dispatch(eventActions.createNewEvent(formData));
    } else if (addOrEdit === "Edit") {
      dispatch(eventActions.updateEvent(selectedEvent._id, formData));
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
              <Form.Label className="mr-3">Event Date</Form.Label>
              <DatePicker
                selected={formData.date}
                name="date"
                value={formData.date}
                onChange={handleChangeDate}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mr-3">Event Hour</Form.Label>
              <Row>
                <Col>
                  <span>Start Hour</span>
                  <TimePicker
                    start="00:00"
                    end="23:59"
                    step={30}
                    name="startHour"
                    value={formData.startHour}
                    onChange={handleChangeStartTime}
                  />
                </Col>
                <Col>
                  <span> End Hour</span>
                  <TimePicker
                    start="00:00"
                    end="23:59"
                    step={30}
                    name="endHour"
                    value={formData.endHour}
                    onChange={handleChangeEndTime}
                  />
                </Col>
              </Row>
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
              <Button variant="dark" onClick={handleCancel} disabled={loading}>
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
