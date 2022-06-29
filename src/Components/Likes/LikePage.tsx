import React, { useState, useEffect } from "react";
import axios from "axios";
import 'animate.css'

export default function LikePage({ user }: any) {
  const [likedProducts, setLikedProducts] = useState([]);
  const likeSlideMap = likedProducts.map((like, index) => (
    <div className={index === 0 ? "carousel-item active" : "carousel-item"} style={{borderRadius: "10%"}}>
      <img src={like.product_img} style={{height: "300px", opacity: "50%"}} className="d-block img-fluid w-100" alt="product" />
      <div className="carousel-caption d-md-block">
        <h5>{like.product_name.toLowerCase()}</h5>
        <p>{like.product_description.toLowerCase()}</p>
      </div>
    </div>
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
  }, [user]);

  return (
    <div className="container" style={{ height: "90vh" }}>
      <div>
        <h1 className="mt-4">liked</h1>
      </div>
      <div style={{height:"75vh"}} className="d-flex align-items-center">
        {likedProducts.length ? (
          <div
            id="carouselExampleCaptions"
            className="carousel slide animate__animated animate__slideInUp"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              {likedProducts.map((product, index) => (
                <li
                  data-target="carouselExampleCaptions"
                  data-slide-to={index}
                  className={index === 0 ? "active" : null}
                />
              ))}
            </ol>
            <div className="carousel-inner">{likeSlideMap}</div>
            <button
              className="carousel-control-prev"
              type="button"
              data-target="#carouselExampleCaptions"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-target="#carouselExampleCaptions"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </button>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
}
