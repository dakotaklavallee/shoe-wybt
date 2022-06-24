import React from "react";
import SurveyDisplayCard from "./SurveyDisplayCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurveyDisplay.css";

export default function SurveyDisplay({
  user,
  todaysSurvey,
  handleTransition,
}: any) {
  const initialUser = {
    survey_index: 0,
    survey_done: false,
  };
  const [currentUser, setCurrentUser] = useState(initialUser);
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

  const navigate = useNavigate();
  const handleBegin = (e) => {
    handleTransition();
    navigate(`/surveys/${todaysSurvey.survey_id}`);
  };
  return (
    <>
      {Object.keys(todaysSurvey).length && Object.keys(currentUser) ? (
        <>
          {currentUser.survey_done === false ? (
            <SurveyDisplayCard
              handleBegin={handleBegin}
              todaysSurvey={todaysSurvey}
              currentUser={currentUser}
            />
          ) : null}
        </>
      ) : (
        <div>
          <h3>Loading...</h3>
        </div>
      )}
    </>
  );
}
