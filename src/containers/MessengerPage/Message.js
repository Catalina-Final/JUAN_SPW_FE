import React from "react";
import { Media } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import ReactEmoji from "react-emoji";

const Message = ({ msg }) => {
  const currentUser = useSelector((state) => state.auth.user);
  if (!msg.user) return <></>;
  return (
    <Media as="li">
      <img
        src={
          msg?.user.avatarUrl
            ? msg.user.avatarUrl
            : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png"
        }
        alt="User Avatar"
        className="avatar-sm mr-3"
        style={{ width: "50px", height: "50px" }}
      />
      <Media.Body className="text-left">
        <div>
          <span
            className={
              currentUser && currentUser._id === msg.user._id
                ? "text-primary"
                : "text-success"
            }
          >
            <strong>@{msg.user.name}</strong>
          </span>
          <span className="text-secondary ml-2">
            <Moment fromNow>{msg.createdAt}</Moment>
          </span>
        </div>
        <div className="content-body">
          <p>{ReactEmoji.emojify(msg.body)}</p>
        </div>
      </Media.Body>
    </Media>
  );
};

export default Message;
