import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NoMoreSurveys from "../Surveys/NoMoreSurveys";
import SurveyDisplay from "../Surveys/SurveyDisplay";

export default function HomePage({ mainUser, isAuthenticated, todaysSurvey }: any) {

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <div className="">
            <h1>shoe inc.</h1>
          </div>
          <div className="">
            {mainUser.survey_done === false ? (
              <SurveyDisplay todaysSurvey={todaysSurvey} />
            ) : (
              <NoMoreSurveys />
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Please Sign In To See Your Content</h2>
          <Link to="/login">Sign In</Link>
        </div>
      )}
    </>
  );
}
