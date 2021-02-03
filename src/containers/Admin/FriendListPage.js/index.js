import React, { useState, useEffect } from "react";
import SearchItem from "../../../components/SearchItem";
import PaginationItem from "../../../components/PaginationItem";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { Button, Row, Col, Container, Table, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { friendListTabNames, actionTypes } from "../../../config/constants";

const FriendListPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPageNum = useSelector((state) => state.user.totalPageNum);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [action, setAction] = useState("");
  const [targetId, setTargetId] = useState("");
  const [tabKey, setTabKey] = useState(friendListTabNames.ALL_USERS);
  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const users = useSelector((state) => {
    return state.user.users;
  });

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setAction("");
    setTargetId("");
    setQuery(searchInput);
  };

  const handleSort = (key) => {
    if (!loading) {
      setSortBy((sortBy) => ({
        key,
        ascending: -sortBy.ascending,
      }));
    }
  };

  useEffect(() => {
    switch (tabKey) {
      case friendListTabNames.FRIENDS:
        dispatch(userActions.friendsRequest(pageNum, 10, query, sortBy));
        // console.log("1", pageNum, query, sortBy, users);
        break;
      case friendListTabNames.SENT_REQUESTS:
        dispatch(userActions.getSentRequests(pageNum, 10, query, sortBy));
        // console.log("2", pageNum, query, sortBy, users);
        break;
      case friendListTabNames.RECEIVED_REQUEST:
        dispatch(userActions.getReceivedRequests(pageNum, 10, query, sortBy));
        // console.log("3", pageNum, query, sortBy, users);
        break;
      case friendListTabNames.ALL_USERS:
        dispatch(userActions.usersRequest(pageNum, 10, query, sortBy));
        // console.log("4", pageNum, query, sortBy, users);
        break;
      default:
    }
  }, [dispatch, pageNum, query, sortBy, tabKey]);

  useEffect(() => {
    switch (action) {
      case actionTypes.ADD_FRIEND:
        dispatch(userActions.addFriend(targetId));
        break;

      case actionTypes.REMOVE_FRIEND:
        dispatch(userActions.removeFriend(targetId));
        break;
      case actionTypes.DECLINE_REQUEST:
        dispatch(userActions.declineRequest(targetId));
        break;
      case actionTypes.ACCEPT_REQUEST:
        dispatch(userActions.acceptRequest(targetId));
        break;

      case actionTypes.CANCEL_REQUEST:
        dispatch(userActions.cancelRequest(targetId));
        break;

      default:
    }
  }, [dispatch, action, targetId]);

  useEffect(() => {}, [users]);

  const handleChangeTab = (key, user) => {
    setTabKey(key);
    setPageNum(1);
    setAction("");
    setTargetId("");
    generateActions(user);
  };

  const handleActionClick = (actionType, userId) => {
    setAction(actionType);
    setTargetId(userId);
  };

  const generateActions = (user) => {
    if (tabKey === friendListTabNames.FRIENDS) {
      // Generate Remove Friend Button
      return (
        <Button
          variant="danger"
          onClick={() => handleActionClick(actionTypes.REMOVE_FRIEND, user._id)}
        >
          <FontAwesomeIcon icon="trash-alt" size="1x" /> Remove Friend
        </Button>
      );
    }

    if (tabKey === friendListTabNames.SENT_REQUESTS) {
      return (
        <Button
          variant="danger"
          onClick={() =>
            handleActionClick(actionTypes.CANCEL_REQUEST, user._id)
          }
        >
          <FontAwesomeIcon icon="trash-alt" size="1x" /> Cancel
        </Button>
      );
    }

    if (tabKey === friendListTabNames.RECEIVED_REQUEST) {
      return (
        <>
          <Button
            variant="success"
            onClick={() =>
              handleActionClick(actionTypes.ACCEPT_REQUEST, user._id)
            }
          >
            <FontAwesomeIcon icon="check-square" size="1x" /> Accept
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              handleActionClick(actionTypes.DECLINE_REQUEST, user._id)
            }
          >
            <FontAwesomeIcon icon="times-circle" size="1x" /> Decline
          </Button>
        </>
      );
    }

    if (tabKey === friendListTabNames.ALL_USERS) {
      if (user?.friendship?.status === "accepted") {
        // console.log("USER ACCEPTED>>", user && user.friendship);
        return (
          <span className="text-success">
            <FontAwesomeIcon icon="check-square" size="sm" /> Friend
          </span>
        );
      } else if (user?.friendship?.status === "requesting") {
        // console.log("USER REQUESTED>>", user && user.friendship);
        return (
          <span className="text-warning">
            <FontAwesomeIcon icon="pause-circle" size="sm" /> Requesting
          </span>
        );
      } else {
        // console.log("USER ELSE>>", user && user.friendship);
        return (
          <Button
            variant="primary"
            onClick={() => handleActionClick(actionTypes.ADD_FRIEND, user._id)}
          >
            <FontAwesomeIcon icon="plus" size="1x" /> Add Friend
          </Button>
        );
      }
    }
  };

  const renderUserList = (user) => {
    if (tabKey === "FRIEND_LIST.TAB_KEY.ALL_USERS") {
      return (
        <tr key={`${user._id}-all-users`}>
          <td className="text-center textwhitecolor">
            <div>
              <img src={user.avatarUrl} className="avatar-sm" alt="avatar" />
            </div>
          </td>
          <td className="text-center textwhitecolor">{user.name}</td>
          <td className="text-center textwhitecolor">{user.email}</td>
          <td className="text-center textwhitecolor">{user.friendCount}</td>
          <td className="text-center textwhitecolor">
            {generateActions(user)}
          </td>
        </tr>
      );
    } else if (tabKey === "FRIEND_LIST.TAB_KEY.RECEIVED_REQUEST") {
      return (
        <tr key={`${user._id}-received-request`}>
          <td className="text-center textwhitecolor">
            <div>
              <img
                src={user.from?.avatarUrl}
                className="avatar-sm"
                alt="avatar"
              />
            </div>
          </td>
          <td className="text-center textwhitecolor">{user.from?.name}</td>
          <td className="text-center textwhitecolor">{user.from?.email}</td>
          <td className="text-center textwhitecolor">
            {user.from?.friendCount}
          </td>
          <td className="text-center textwhitecolor">
            {generateActions(user)}
          </td>
        </tr>
      );
    } else if (tabKey === "FRIEND_LIST.TAB_KEY.SENT_REQUESTS") {
      return (
        <tr key={`${user._id}-sent-request`}>
          <td className="text-center textwhitecolor">
            <div>
              <img
                src={user.to?.avatarUrl}
                className="avatar-sm"
                alt="avatar"
              />
            </div>
          </td>
          <td className="text-center textwhitecolor">{user.to?.name}</td>
          <td className="text-center textwhitecolor">{user.to?.email}</td>
          <td className="text-center textwhitecolor">{user.to?.friendCount}</td>
          <td className="text-center textwhitecolor">
            {generateActions(user)}
          </td>
        </tr>
      );
    } else if (tabKey === "FRIEND_LIST.TAB_KEY.FRIENDS") {
      console.log("USER EXIST====", user);
      return (
        <tr key={`${user._id}-friends`}>
          <td className="text-center textwhitecolor">
            <div>
              <img src={user.avatarUrl} className="avatar-sm" alt="avatar" />
            </div>
          </td>
          <td className="text-center textwhitecolor">{user.name}</td>
          <td className="text-center textwhitecolor">{user.email}</td>
          <td className="text-center textwhitecolor">{user.friendCount}</td>
          <td className="text-center textwhitecolor">
            {generateActions(user)}
          </td>
        </tr>
      );
    }
  };

  return (
    <Container fluid>
      <h4 className="mt-3">Friend Manage</h4>
      <Row>
        <Col md={4}>
          <SearchItem
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>
        <Col
          md={8}
          className="d-flex justify-content-between align-items-start"
        ></Col>
      </Row>

      <Tabs activeKey={tabKey} onSelect={(k) => handleChangeTab(k)}>
        <Tab eventKey={friendListTabNames.FRIENDS} title="Friends"></Tab>
        <Tab
          eventKey={friendListTabNames.SENT_REQUESTS}
          title="Sent Requests"
        ></Tab>
        <Tab
          eventKey={friendListTabNames.RECEIVED_REQUEST}
          title="Received Requests"
        ></Tab>
        <Tab eventKey={friendListTabNames.ALL_USERS} title="All Users"></Tab>
      </Tabs>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Avatar</th>
                <th className="mouse-hover" onClick={() => handleSort("name")}>
                  Name <FontAwesomeIcon icon="sort" size="sm" />
                </th>
                <th className="mouse-hover" onClick={() => handleSort("email")}>
                  Email <FontAwesomeIcon icon="sort" size="sm" />
                </th>
                <th
                  className="mouse-hover"
                  onClick={() => handleSort("friendCount")}
                >
                  Friend Count <FontAwesomeIcon icon="sort" size="sm" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{users?.map((user) => renderUserList(user))}</tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          <PaginationItem
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FriendListPage;
