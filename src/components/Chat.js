import React from "react";
import socket from "../socket";
import { Button } from "react-bootstrap";

export default function Chat() {
  const Rooms = (props) =>
    props.rooms.map((e, idx) => {
      return (
        <div style={{ margin: "30px" }}>
          <Button
            id="inner"
            variant="success"
            style={{
              display: "flex",
              fontSize: "20px",
              margin: "",
            }}
            className={
              !props.currentRoom
                ? ""
                : e._id === props.currentRoom._id
                ? "bold"
                : ""
            }
            onClick={() => {
              if (props.currentRoom) {
                socket.emit("leaveRoom", props.currentRoom._id);
              }
              socket.emit("joinRoom", e._id, (res) => {
                if (res.status === "ok") {
                  props.setCurrentRoom(res.data.room);
                } else {
                  alert("something wrong");
                }
              });
            }}
          >
            {" "}
            {e.room} {idx === props.rooms.length - 1 ? "" : ""}{" "}
          </Button>
        </div>
      );
    });

  function Sidebar({ user }) {
    const [rooms, setRooms] = React.useState([]);
    const [currentRoom, setCurrentRoom] = React.useState(null);

    React.useEffect(() => {
      socket.on("rooms", function (data) {
        if (data && Array.isArray(data)) {
          setRooms(data);
        }
      });
    }, [rooms]);

    return (
      <div className="sidebar">
        <h1>{user && user.name}</h1>
        <div id="outer">
          <Rooms
            rooms={rooms}
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
          />{" "}
        </div>
      </div>
    );
  }

  return (
    <div>{/* <Sidebar user={user} />
      <Content user={user} /> */}</div>
  );
}
