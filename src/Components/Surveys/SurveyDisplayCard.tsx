import React from "react";

export default function SurveyDisplayCard({
  currentUser,
  todaysSurvey,
  handleBegin,
}: any) {
  return (
    <>
      {currentUser.survey_index < 6 ? (
        <div className="card text-center" style={{ width: "30rem" }}>
          <div className="card-header" style={{ backgroundColor: "#000" }}>
            {todaysSurvey.survey_name}
          </div>
          <div className="image-vibe"></div>
          <div className="card-body display-me">
            <p className="card-text">{todaysSurvey.survey_description}</p>
            <button onClick={handleBegin} className="btn btn-secondary">
              {currentUser.survey_index === 1
                ? "Begin Survey"
                : "Resume Survey"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
