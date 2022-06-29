import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import 'animate.css';

export default function UserPage({ avatars, user }: any) {
  const [currentUser, setCurrentUser] = useState({ points: 0 });
  const [userAvatar, setUserAvatar] = useState({ avatar_url: "" });
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    logout();
    navigate("/");

  }

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        if (Object.keys(user).length) {
          const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}`,
          };
          const response = await axios.request(options);
          if (response) {
            setUserAvatar(
              avatars.find(
                (tar) => tar.avatar_id === response.data.data.avatar_id
              )
            );
            setCurrentUser(response.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentUser();
  });
  return (
    <>
      {Object.keys(currentUser).length && Object.keys(userAvatar).length ? (
        <div
          style={{ height: "90vh" }}
          className="d-flex align-items-center justify-content-center animate__animated animate__fadeInDown"
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
              <h5>total points: {currentUser.points}</h5>
              <Link to="/rewards" className="btn btn-secondary col-12 mt-2">
                redeem points
              </Link>
              <Link to="/avatar" className="btn btn-secondary col-12 mt-3">
                change avatar
              </Link>
              <button onClick={handleSignOut} className="btn btn-secondary col-12 mt-3">
                sign out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
