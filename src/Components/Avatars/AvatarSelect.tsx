import React from "react";
import Avatar from "./Avatar";

export default function AvatarSelect({ avatars, user }: any) {
  const avatarMap = avatars.map((tar) => (
    <Avatar key={tar.avatar_id} url={tar.avatar_url} id={tar.avatar_id} user={user} />
  ));
  return (
    <div className="container" style={{height: "89vh"}}>
      <div className="text-center col my-4">
        <h1>Select An Avatar</h1>
      </div>
      <div className="col my-4" style={{height: "80vh"}}>
        {avatars.length ? 
        <>
        <div className="row d-flex justify-content-center">
            <div className="text-center mr-3">{avatarMap[0]}</div>
            <div className="text-center mr-3">{avatarMap[1]}</div>
        </div> 
        <div className="row d-flex justify-content-center mt-2">
            <div className="text-center mr-3">{avatarMap[2]}</div>
            <div className="text-center mr-3">{avatarMap[3]}</div>
        </div> 
        <div className="row d-flex justify-content-center mt-2">
            <div className="text-center mr-3">{avatarMap[4]}</div>
            <div className="text-center mr-3">{avatarMap[5]}</div>
        </div> 
        <div className="row d-flex justify-content-center mt-2">
            <div className="text-center mr-3">{avatarMap[6]}</div>
            <div className="text-center mr-3">{avatarMap[7]}</div>
        </div> 
        </>
        :null}
      </div>
    </div>
  );
}
