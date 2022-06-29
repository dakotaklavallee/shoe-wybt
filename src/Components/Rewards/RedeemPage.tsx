import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import RedeemCard from "./RedeemCard";
import "animate.css";

export default function RedeemPage({ user }: any) {
  const [currentUser, setCurrentUser] = useState({ points: 0 });
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        if (Object.keys(user).length) {
          const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}`,
          };
          const response = await axios.request(options);
          if (response) {
            setCurrentUser(response.data.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentUser();
  });
  return (
    <div>
      <div className="mt-4">
        <h2>redeem.</h2>
      </div>
      <div
        style={{ height: "75vh" }}
        className="d-flex align-items-center justify-content-center animate__animated animate__slideInUp"
      >
        {Object.keys(currentUser).length ? (
          <RedeemCard user={currentUser} />
        ) : null}
      </div>
    </div>
  );
}
