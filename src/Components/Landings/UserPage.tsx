import React from "react";
import { Link } from "react-router-dom";
import './UserPage.css';

export default function UserPage({ userAvatar, user }: any) {
  return (
    <div style={{height: "100vh"}} className="col">
      <div className="row d-flex justify-content-center mt-3">
        <h1>{user.username}</h1>
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <img className="user-avatar" src={userAvatar.avatar_url} alt="avatar" />
      </div>
      <div className="row d-flex justify-content-center mt-3">
          <h2>Total Points:</h2>
      </div>
      <div className="row d-flex justify-content-center mt-3">
          <h5>{user.points}</h5>
      </div>
      <div className="row d-flex justify-content-center mt-3">
          <Link to="/rewards" className="btn btn-secondary">Redeem Points</Link>
      </div>
      <div className="row d-flex justify-content-center mt-3">
          <Link to="/" className="btn btn-danger">Return Home</Link>
      </div>
    </div>
  );
}
