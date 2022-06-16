import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SurveyDisplay.css'; 

export default function SurveyDisplay({todaysSurvey}: any){
    return (
        <>
        {Object.keys(todaysSurvey).length ? 
        <div className="card text-center">
            <div className="card-header" style={{backgroundColor: "#000"}}>
            {todaysSurvey.survey_name}
            </div>
            <div className="image-vibe"></div>
            <div className="card-body display-me">
                <p className="card-text">{todaysSurvey.survey_description}</p>
                <Link to={`/surveys/${todaysSurvey.survey_id}`} className="btn btn-secondary">Begin Survey</Link>
            </div>
        </div>
        : <div>
            <h3>Loading...</h3>
            </div>}
        </>
    );
}