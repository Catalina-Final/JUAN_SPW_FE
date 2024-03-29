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
import { blogActions } from "../../redux/actions";
import TextEditor from "../../components/TextEditor";

const AddEditBlogPage = () => {
  const [text, setText] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: null,
  });

  console.log(`formData`, formData);
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  console.log(`selectedBlog`, selectedBlog);
  const redirectTo = useSelector((state) => state.blog.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";

  useEffect(() => {
    if (addOrEdit === "Edit") {
      setFormData((formData) => ({
        ...formData,
        title: selectedBlog.title,
        content: selectedBlog.content,
        images: selectedBlog.images,
      }));
    }
  }, [addOrEdit, selectedBlog]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    console.log(`formDataSUBMIT`, formData);
    e.preventDefault();
    const { title, content, images } = formData;
    if (addOrEdit === "Add") {
      dispatch(blogActions.createNewBlog(title, content, images));
    } else if (addOrEdit === "Edit") {
      dispatch(blogActions.updateBlog(selectedBlog._id, title, content));
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    // TODO : popup confirmation modal
    dispatch(blogActions.deleteBlog(selectedBlog._id));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(blogActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(blogActions.setRedirectTo(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["SPW", "blog images"],
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

  const handleChangeContent = () => {
    setFormData((formData) => ({
      ...formData,
      content: text,
    }));
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={{ span: 12 }}>
            <Form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <h1 className="text-primary">{addOrEdit} blog</h1>
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
                {formData?.images?.map((image) => (
                  <img
                    src={image}
                    key={image}
                    width="90px"
                    height="60px"
                    alt="blog images"
                  ></img>
                ))}
                <Button variant="info" onClick={uploadWidget}>
                  {addOrEdit} Images
                </Button>
              </Form.Group>

              <TextEditor
                setText={setText}
                text={text}
                setFormData={setFormData}
                formData={formData}
                onChange={handleChangeContent}
              />

              <ButtonGroup className="d-flex mb-3">
                {loading ? (
                  <Button
                    className="mr-2"
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
              {addOrEdit === "Edit" && (
                <ButtonGroup className="d-flex">
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    Delete Blog
                  </Button>
                </ButtonGroup>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddEditBlogPage;
