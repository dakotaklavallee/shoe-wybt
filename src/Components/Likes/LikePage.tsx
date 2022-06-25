import React, { useState, useEffect } from "react";
import LikeCard from "./LikeCard";
import axios from "axios";

export default function LikePage({ user }: any) {
  const [likedProducts, setLikedProducts] = useState([]);
  const likeMap = likedProducts.map((like) => (
    <LikeCard product={like} key={like.product_id} />
  ));
  useEffect(() => {
    async function fetchLiked() {
      try {
        if (Object.keys(user).length) {
          const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/likes`,
          };
          const response = await axios.request(options);
          if (response) {
            console.log(response);
            const data = response.data.data.reduce((acc, userLike) => {
              acc.push(userLike.products[0]);
              return acc;
            }, []);
            setLikedProducts(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchLiked();
  });

  return (
    <div className="container" style={{height: "90vh"}}>
      <div>
        <h1>liked</h1>
      </div>
      <div>{likedProducts.length ? <div>{likeMap}</div> : null}</div>
    </div>
  );
}
