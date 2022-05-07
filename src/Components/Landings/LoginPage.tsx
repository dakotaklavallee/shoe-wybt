import React from "react";
import shoeIcon from "../../img/shoe-icon.jpg";

export default function LoginPage({
  signInHandler,
  signOutHandler,
  isAuthenticated,
}: any) {
  return (
    <div className="row d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="col d-flex justify-content-center">
        {isAuthenticated ? (
          <button className="btn btn-danger px-5 py-3" onClick={signOutHandler}>
            Sign Out
          </button>
        ) : (
          <button className="btn btn-danger px-5 py-3" onClick={signInHandler}>
            Sign In
          </button>
        )}
      </div>
      <div className="col mr-2">
        <h1>Welcome To Shoe.inc</h1>
        <p>
          Your opinion matters. Sign in to begin collecting points for your
          voice.
        </p>
        <img src={shoeIcon} alt="shoe" width="170px" />
      </div>
    </div>
  );
}
