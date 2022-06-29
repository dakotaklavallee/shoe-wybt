import React from "react";
import shoeIntro from "../../img/shoeLogoPlain.svg";
import {ReactComponent as ShoeText} from "../../img/shoe3.svg";
import './LoginPage.css';

export default function LoginPage({
  signInHandler,
  signOutHandler,
  isAuthenticated,
}: any) {
  return (
    <div className="container">
      <div
        className="row d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-sm-6 col-12 text-center">
          <div className="m-0 p-0">
            <ShoeText />
          </div>
          
          <p className="mb-0">
            your opinion matters.
          </p>
          <p>
          sign in to begin collecting points for your voice.
          </p>
          <img src={shoeIntro} alt="shoe" width="300px" />
        </div>
        <div
          className="col-12 col-sm-6 d-flex justify-content-center sign-in-button mb-4"
        >
          {isAuthenticated ? (
            <button
              className="btn btn-danger px-5 py-3"
              onClick={signOutHandler}
            >
              sign out
            </button>
          ) : (
            <button
              className="btn btn-danger px-5 py-3 mb-4"
              onClick={signInHandler}
            >
              sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
