import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "../../src/redux/actions/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Particles from "react-particles-js";
import { Button } from "react-bootstrap";

const UsersList = () => {
  //  const [pageNum, setPageNum] = useState(1);
  // const [query, setQuery] = useState("");
  //  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.user.users;
  });
  console.log("USERS", users);

  const [userToFollow, setUserToFollow] = useState(null);
  console.log("SETUSERTOFOLLOW--------->", userToFollow, "------");
  if (userToFollow) {
    dispatch(userActions.addFollower(userToFollow));
  }

  useEffect(() => {
    dispatch(userActions.usersRequest());
  }, [dispatch]);

  return (
    <div>
      {" "}
      {users.length ? (
        <div className="userListBackground">
          <div className="userList">
            {users.map((user) => (
              <div className="center-text userListUser m-2" key={user.id}>
                <div className="center-text">
                  <Button
                    variant="danger"
                    onClick={(e) => setUserToFollow(user)}
                  >
                    <FontAwesomeIcon icon="times-circle" size="1x" /> Follow
                  </Button>
                  <img
                    className="center-cropped"
                    src={
                      user.avatarUrl
                        ? user.avatarUrl
                        : "https://study.agro-bordeaux.fr/wp-content/themes/bsa/img/avatar.png"
                    }
                    alt="avatar"
                    height="150px"
                  />
                </div>
                <div className="text-center">
                  <p>{user.name} </p>
                </div>
                <div className="d-flex justify-content-center">
                  <div>
                    <a href={user.facebook} target="_new">
                      <FontAwesomeIcon
                        className="reactionsIcons"
                        icon={faFacebook}
                        size="2x"
                      />
                    </a>
                  </div>
                  <div>
                    <a href={user.instagram} target="_new">
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
            ))}
          </div>
          <div>
            <Particles
              style={{
                position: "inherit",
                bottom: 20,
                left: 0,
                width: "200px",
                height: "200px",
                maxHeight: "30vh",
              }}
              params={{
                particles: {
                  number: {
                    value: 80,
                    density: {
                      enable: true,
                      value_area: 400,
                    },
                  },
                  color: {
                    value: ["fffff0", "33b6e575"],
                  },
                  shape: {
                    type: "circle",
                    stroke: {
                      width: 0.5,
                      color: "#b6b2b2",
                    },
                  },
                  opacity: {
                    value: 0.5211089197812949,
                    random: true,
                    anim: {
                      enable: true,
                      speed: 1,
                      opacity_min: 0.1,
                      sync: false,
                    },
                  },
                  size: {
                    value: 8.017060304327615,
                    random: true,
                    anim: {
                      enable: true,
                      speed: 12.181158184520175,
                      size_min: 0.1,
                      sync: true,
                    },
                  },
                  line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#c8c8c8",
                    opacity: 0.4,
                    width: 1,
                  },
                  move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "bounce",
                    bounce: false,
                    attract: {
                      enable: false,
                      rotateX: 600,
                      rotateY: 1200,
                    },
                  },
                },
                interactivity: {
                  detect_on: "canvas",
                  events: {
                    onhover: {
                      enable: true,
                      mode: "grab",
                    },
                    onclick: {
                      enable: false,
                      mode: "push",
                    },
                    resize: true,
                  },
                  modes: {
                    grab: {
                      distance: 400,
                      line_linked: {
                        opacity: 1,
                      },
                    },
                    bubble: {
                      distance: 400,
                      size: 10,
                      duration: 2,
                      opacity: 8,
                      speed: 3,
                    },
                    repulse: {
                      distance: 200,
                      duration: 0.4,
                    },
                    push: {
                      particles_nb: 4,
                    },
                    remove: {
                      particles_nb: 2,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1>There are no events </h1>
        </div>
      )}
    </div>
  );
};

export default UsersList;
