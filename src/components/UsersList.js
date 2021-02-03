import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { userActions } from "../../src/redux/actions/user.actions";

const UsersList = () => {
  //   const [pageNum, setPageNum] = useState(1);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  //   const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const users = useSelector((state) => {
    return state.user.users;
  });
  console.log("USERRSS", users);

  useEffect(() => {
    dispatch(userActions.usersRequest(query));
  }, []);
  return (
    <div>
      {" "}
      {users.length ? (
        <div>
          {users.map((user) => (
            <h1> {user.name} </h1>
          ))}
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
