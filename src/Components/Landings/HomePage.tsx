import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NoMoreSurveys from "../Surveys/NoMoreSurveys";
import SurveyDisplay from "../Surveys/SurveyDisplay";
import 'animate.css';

export default function HomePage({
  mainUser,
  isAuthenticated,
  todaysSurvey,
  handleTransition,
}: any) {
  const initialUser = {
    survey_done: false,
  };
  const [currentUser, setCurrentUser] = useState(initialUser);
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        if (Object.keys(mainUser).length) {
          const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${mainUser.user_id}`,
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
      {isAuthenticated && currentUser ? (
        <div className="home">
          <div className="mt-4">
            <h1>shoe inc.</h1>
          </div>
          <div
            style={{ height: "75vh" }}
            className="d-flex align-items-center justify-content-center animate__animated animate__slideInUp"
          >
            {!currentUser.survey_done ? (
              <SurveyDisplay
                user={mainUser}
                todaysSurvey={todaysSurvey}
                handleTransition={handleTransition}
              />
            ) : (
              <NoMoreSurveys />
            )}
          </div>
        </div>
      ) : null }
    </>
  );
}
