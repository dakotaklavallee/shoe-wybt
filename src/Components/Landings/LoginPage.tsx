import React from "react";
import shoeIntro from "../../img/shoeLogoPlain.svg";
import {ReactComponent as ShoeText} from "../../img/shoe5.svg";
import './LoginPage.css';

export default function LoginPage({
  signInHandler,
  signOutHandler,
  isAuthenticated,
}: any) {
  return (
    <div className="container login-page">
      <div
        className="row d-flex align-items-center"
      >
        <div className="col-sm-6 col-12 text-center mt-2">
          <div className="my-2 p-0">
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
              style={{backgroundColor: "black"}}
              onClick={signOutHandler}
            >
              sign out
            </button>
          ) : (
            <button
              className="btn btn-danger px-5 py-3 mb-4"
              style={{backgroundColor: "black"}}
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
