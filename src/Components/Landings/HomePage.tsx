import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NoMoreSurveys from "../Surveys/NoMoreSurveys";
import SurveyDisplay from "../Surveys/SurveyDisplay";

export default function HomePage({ mainUser, isAuthenticated, todaysSurvey, handleTransition }: any) {

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <div className="mt-4">
            <h1>shoe inc.</h1>
          </div>
          <div style={{height: "75vh"}} className="d-flex align-items-center justify-content-center">
            {mainUser.survey_done === false ? (
              <SurveyDisplay todaysSurvey={todaysSurvey} handleTransition={handleTransition} />
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
