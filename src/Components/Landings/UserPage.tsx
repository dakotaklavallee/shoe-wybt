import React from "react";
import { Link } from "react-router-dom";
import "./UserPage.css";

export default function UserPage({ userAvatar, user }: any) {
  return (
    <div style={{height:"90vh"}} className="d-flex align-items-center justify-content-center">
      <div className="card text-center" style={{width:"80vh"}}>
        <div className="card-header" style={{ backgroundColor: "#000" }}>
          <h1>{user.username}</h1>
        </div>
        <div>
          <img
            className="user-avatar"
            src={userAvatar.avatar_url}
            alt="avatar"
          />
        </div>
        <div className="card-body">
          <h5>Total Points: {user.points}</h5>
          <Link to="/rewards" className="btn btn-secondary col-12 mt-2">
            Redeem Points
          </Link>
          <Link to="/rewards" className="btn btn-secondary col-12 mt-3">
            Change Avatar
          </Link>
        </div>
      </div>
    </div>
  );
}
