import React, { useState } from "react"
import shoeIcon from '../../img/shoe-icon.jpg';
import { useAuth0 } from '@auth0/auth0-react';
import e from "express";

export default function LoginPage(){
    const { loginWithRedirect, user, logout } = useAuth0();
    const [mainUser, setMainUser] = useState({});
    const signInHandler = async (e: any) => {
        e.preventDefault();
        await loginWithRedirect();
        setMainUser(user!);
    }

    console.log(user);

    const signOutHandler = (e: any) =>{
        e.preventDefault();
        logout();
    }

    return (
        <div className="row d-flex align-items-center" style={{height:"100vh"}}>
            <div className="col d-flex justify-content-center">
                <button 
                className="btn btn-danger px-5 py-3"
                onClick={signInHandler}
                >
                    Sign In
                </button>
                <button 
                className="btn btn-danger px-5 py-3"
                onClick={signOutHandler}
                >
                    Sign Out
                </button>
            </div>
            <div className="col mr-2">
                <h1>Welcome To Shoe.inc</h1>
                <p>Your opinion matters. Sign in to begin collecting points for your voice.</p>
                <img src={shoeIcon} alt="shoe" width="170px" />
            </div>
        </div>
    );
}