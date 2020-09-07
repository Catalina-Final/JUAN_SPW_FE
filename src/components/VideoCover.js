import React, { Component } from "react";

class VideoCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoURL:
        "https://www.youtube.com/watch?v=3qgYVKKD1Gg&ab_channel=Lidiopofficial",
    };
  }

  render() {
    return (
      <video id="background-video" loop autoPlay>
        <source src={this.state.videoURL} type="video/mp4" />
        <source src={this.state.videoURL} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default VideoCover;
