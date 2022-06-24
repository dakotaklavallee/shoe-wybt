import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Avatar({url, user, id}: any){
    const navigate = useNavigate();
    const handleSelect = async (e) => {
        e.preventDefault();
        try {
            const data = user;
            const options = {
              method: "PUT",
              url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/avatar`,
              data: {data: {...data, avatar_id: id}},
            };
            const response = await axios.request(options);
            if (response) {
                navigate("/user")
            }
          } catch (error) {
            console.log(error);
          }
    }
    return (
         <img className="user-avatar-picker col-6" onClick={handleSelect} src={url} alt="avatar" />   
    );
}