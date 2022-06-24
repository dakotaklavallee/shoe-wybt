import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserPage.css";

export default function UserPage({ userAvatar, user }: any) {
  const [currentUser, setCurrentUser] = useState({points: 0});
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        if (Object.keys(user).length) {
          const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}`,
          };
          const response = await axios.request(options);
          setCurrentUser(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentUser();
  });
  return (
    <>
      {Object.keys(currentUser).length ? (
        <div
          style={{ height: "90vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="card text-center" style={{ width: "80vh" }}>
            <div className="card-header" style={{ backgroundColor: "#000" }}>
              <h1>{user.username}</h1>
            </div>
            <div>
              <img
                className="user-avatar"
                src={userAvatar.avatar_url}
                alt="avatar"
              />
            </div>
            <div className="card-body">
              <h5>Total Points: {currentUser.points}</h5>
              <Link to="/rewards" className="btn btn-secondary col-12 mt-2">
                Redeem Points
              </Link>
              <Link to="/rewards" className="btn btn-secondary col-12 mt-3">
                Change Avatar
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
