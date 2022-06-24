import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SurveyDisplay.css'; 

export default function SurveyDisplay({todaysSurvey, handleTransition}: any){
    const navigate = useNavigate();
    const handleBegin = (e) =>{
        handleTransition();
        navigate(`/surveys/${todaysSurvey.survey_id}`);
    }
    return (
        <>
        {Object.keys(todaysSurvey).length ? 
        <div className="card text-center" style={{width: "30rem"}}>
            <div className="card-header" style={{backgroundColor: "#000"}}>
            {todaysSurvey.survey_name}
            </div>
            <div className="image-vibe"></div>
            <div className="card-body display-me">
                <p className="card-text">{todaysSurvey.survey_description}</p>
                <button onClick={handleBegin} className="btn btn-secondary">Begin Survey</button>
            </div>
        </div>
        : <div>
            <h3>Loading...</h3>
            </div>}
        </>
    );
}