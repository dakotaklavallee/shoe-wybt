import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Landings/HomePage";
import LoginPage from "./Components/Landings/LoginPage";
import Navbar from "./Components/Constants/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import axios from "axios";
import UserPage from "./Components/Landings/UserPage";

function App() {
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();
  const [mainUser, setMainUser] = useState({});
  const [users, setUsers] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [userAvatar, setUserAvatar] = useState({});

  useEffect(() => {
    async function fetchUsers() {
      try {
        const options = {
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/users`,
        };
        const response = await axios.request(options);
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    try {
      if (isAuthenticated) {
        const foundUser = users.find((usr: any) => usr.email === user!.email);
        const foundAvatar = avatars.find(
          (avatr: any) => avatr.avatar_id === foundUser.avatar_id
        );
        console.log(foundUser);
        setMainUser(foundUser);
        setUserAvatar(foundAvatar);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated, user, users, avatars]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    async function fetchAvatars() {
      try {
        const options = {
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/avatars`,
          cancelToken: source.token,
        };
        const response = await axios.request(options);
        setAvatars(response.data.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          source.cancel("axios request cancelled");
        }
      }
    }
    fetchAvatars();
  }, []);

  const signInHandler = async (e: any) => {
    e.preventDefault();
    await loginWithRedirect();
  };

  const signOutHandler = (e: any) => {
    e.preventDefault();
    logout();
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar avatar={userAvatar} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                mainUser={mainUser}
                isAuthenticated={isAuthenticated}
                userAvatar={userAvatar}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                signInHandler={signInHandler}
                signOutHandler={signOutHandler}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/user"
            element={<UserPage userAvatar={userAvatar} user={mainUser} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
