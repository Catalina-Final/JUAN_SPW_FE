import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../redux/actions";
import "../App.css";

const Reactions = ({ reactionsData, targetType, target, size }) => {
  const loading = useSelector((state) => state.blog.submitLoading);
  const dispatch = useDispatch();

  const handleClick = (emoji) => {
    dispatch(blogActions.sendEmojiReaction(targetType, target, emoji));
  };

  return (
    <div className="reactionsContainer">
      <ul className="reactions">
        <li className="reactionsbutton">
          <button onClick={() => handleClick("like")} disabled={loading}>
            <FontAwesomeIcon
              className="reactionsIcons"
              icon="thumbs-up"
              size={size}
            />
          </button>
          {reactionsData?.like}{" "}
        </li>
        <li className="reactionsbutton">
          <button onClick={() => handleClick("love")} disabled={loading}>
            <FontAwesomeIcon
              className="reactionsIcons"
              icon="heart"
              size={size}
            />
          </button>
          {reactionsData?.love}{" "}
        </li>
        <li className="reactionsbutton">
          <button onClick={() => handleClick("laugh")} disabled={loading}>
            <FontAwesomeIcon
              className="reactionsIcons"
              icon="laugh"
              size={size}
            />
          </button>
          {reactionsData?.laugh}{" "}
        </li>
        <li className="reactionsbutton">
          <button onClick={() => handleClick("sad")} disabled={loading}>
            <FontAwesomeIcon
              className="reactionsIcons"
              icon="sad-cry"
              size={size}
            />
          </button>
          {reactionsData?.sad}{" "}
        </li>
        <li className="reactionsbutton">
          <button onClick={() => handleClick("angry")} disabled={loading}>
            <FontAwesomeIcon
              className="reactionsIcons"
              icon="angry"
              size={size}
            />
          </button>
          {reactionsData?.angry}{" "}
        </li>
      </ul>
    </div>
  );
};

export default Reactions;
