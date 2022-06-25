import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Constants/Footer";
import HomePage from "./Components/Landings/HomePage";
import LoginPage from "./Components/Landings/LoginPage";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import axios from "axios";
import Survey from "./Components/Surveys/Survey";
import UserPage from "./Components/Landings/UserPage";
import AvatarSelect from "./Components/Avatars/AvatarSelect";
import RedeemPage from "./Components/Rewards/RedeemPage";

function App() {
  const { loginWithRedirect, user, logout, isAuthenticated } = useAuth0();
  const [mainUser, setMainUser] = useState({});
  const [users, setUsers] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [showTransition, setShowTransition] = useState(false);

  const handleTransition = () => {
    setShowTransition(true);
    setTimeout(() => setShowTransition(false), 1500);
  };

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
        console.log(foundUser);
        setMainUser(foundUser);
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

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const options = {
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/surveys`,
        };
        const response = await axios.request(options);
        setSurveys(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSurveys();
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
    <div>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                mainUser={mainUser}
                isAuthenticated={isAuthenticated}
                todaysSurvey={surveys[0]}
                handleTransition={handleTransition}
              />
            }
          />
          <Route
            path="/surveys/:survey_id"
            element={
              <Survey
                todaysSurvey={surveys[0]}
                user={mainUser}
                showTransition={showTransition}
                handleTransition={handleTransition}
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
            element={<UserPage avatars={avatars} user={mainUser} />}
          />
          <Route path="/avatar" element={<AvatarSelect avatars={avatars} user={mainUser} />} />
          <Route path="/rewards" element={<RedeemPage user={mainUser} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
