import React, { useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux/actions";
import ScrollToBottom from "react-scroll-to-bottom";
// import ConversationList from "./ConversationList";
import Message from "./Message";
// import { socketTypes, conversationTypes } from "../../../config/constants";

const socketTypes = {
  NOTIFICATION: "SOCKET.NOTIFICATION",
  CLIENT_SEND: "SOCKET.CLIENT_SEND",
  CLIENT_RECEIVE: "SOCKET.CLIENT_RECEIVE",
  ERROR: "SOCKET.ERROR",
};

let socket;

const MessengerPage = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (accessToken) {
      socket = socketIOClient(process.env.REACT_APP_HOST, {
        query: {
          accessToken,
          roomId,
        },
      });
      console.log("Connect to socket.io");
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [accessToken, roomId]);

  useEffect(() => {
    if (socket) {
      socket.on(socketTypes.NOTIFICATION, (data) => {
        console.log("Notification", data);
        if (data.onlineUsers) {
          setOnlineUsers(data.onlineUsers);
        }
        if (data.oldMessages) {
          setMessages(data.oldMessages);
        }
      });
      socket.on(socketTypes.CLIENT_RECEIVE, (msg) => {
        console.log("Received", msg);
        setMessages((messages) => [...messages, msg]);
      });

      socket.on(socketTypes.ERROR, (err) => {
        dispatch(alertActions.setAlert(err, "danger"));
      });
    }
    return () => {
      if (socket) {
        socket.off(socketTypes.NOTIFICATION);
        socket.off(socketTypes.CLIENT_RECEIVE);
        socket.off(socketTypes.ERROR);
      }
    };
  }, [dispatch]);

  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit(socketTypes.CLIENT_SEND, {
        from: currentUser._id,
        body: newMessage,
      });
    }
    setNewMessage("");
  };

  return (
    <Container fluid>
      <br />

      <h4>Chat Room</h4>
      <h6 className="text-success">
        {onlineUsers && (
          <>
            {onlineUsers.length < 2
              ? onlineUsers.length + " user online"
              : onlineUsers.length + " users online"}
          </>
        )}
      </h6>

      <Row>
        <Col md={8} className="pr-4 d-flex flex-column justify-content-between">
          <ScrollToBottom className="messages border mb-2">
            <ul className="list-unstyled">
              {messages.map((msg) => (
                <Message key={msg._id} msg={msg} />
              ))}
            </ul>
          </ScrollToBottom>
          <div>
            <Form onSubmit={handleSendMessage}>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Type something.."
                    name="newMessage"
                    value={newMessage}
                    onChange={handleChangeMessage}
                  />
                </Col>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!newMessage || !currentUser}
                >
                  Send
                </Button>
              </Form.Row>
            </Form>
          </div>
        </Col>
        {/* <Col md={4} className="p-3 border conversation-list">
          <ConversationList
            onlineUsers={onlineUsers}
            handleClickFriend={handleClickFriend}
            handleClickConversation={handleClickConversation}
          />
        </Col> */}
      </Row>
    </Container>
  );
};

export default MessengerPage;
