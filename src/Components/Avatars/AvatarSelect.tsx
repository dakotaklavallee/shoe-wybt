import React from "react";
import Avatar from "./Avatar";
import 'animate.css';

export default function AvatarSelect({ avatars, user }: any) {
  const avatarMap = avatars.map((tar) => (
    <Avatar key={tar.avatar_id} url={tar.avatar_url} id={tar.avatar_id} user={user} />
  ));
  return (
    <div className="container d-flex align-items-center" style={{height: "90vh"}}>
      <div className="col align-items-center">
        {avatars.length ? 
        <div className="animate__animated animate__fadeIn">
        <div className="row d-flex justify-content-center">
            <div className="text-center mr-3">{avatarMap[0]}</div>
            <div className="text-center">{avatarMap[1]}</div>
        </div> 
        <div className="row d-flex justify-content-center mt-2">
            <div className="text-center mr-3">{avatarMap[2]}</div>
            <div className="text-center">{avatarMap[3]}</div>
        </div> 
        <div className="row d-flex justify-content-center mt-2">
            <div className="text-center mr-3">{avatarMap[4]}</div>
            <div className="text-center">{avatarMap[5]}</div>
        </div> 
        <div className="row d-flex justify-content-center mt-2">
            <div className="text-center mr-3">{avatarMap[6]}</div>
            <div className="text-center">{avatarMap[7]}</div>
        </div> 
        </div>
        :null}
      </div>
    </div>
  );
}
