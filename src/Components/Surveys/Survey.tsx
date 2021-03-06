import React from "react";
import axios from "axios";
import { useReward } from "react-rewards";
import { AiFillHeart } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoeLoading from "../Transitions/ShoeLoading";
import './Survey.css';
import "animate.css";

export default function Survey({ showTransition, user }: any) {
  const navigate = useNavigate();
  const { reward, isAnimating } = useReward("rewardId", "emoji", {
    emoji: ["❤️"],
  });
  const { reward: checkBox, isAnimating: checkBoxAnimating } = useReward(
    "checkReward",
    "emoji",
    { emoji: ["✅"] }
  );
  const [products, setProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [liked, setLiked] = useState(false);
  const initialSurveyData = {
    survey_name: "",
    survey_description: "",
    survey_id: "",
    products: [],
  };
  const [survey, setSurvey] = useState({ ...initialSurveyData });
  const initialProductData = {
    product_name: "",
    product_id: "",
    product_description: "",
    product_img: "",
    said_yes: "",
    said_no: "",
  };
  const [currentProduct, setCurrentProduct] = useState({
    ...initialProductData,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const options = {
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/surveys`,
        };
        const response = await axios.request(options);
        setSurvey(response.data.data[0]);
        setProducts(
          response.data.data[0].products.sort(
            (a, b) => a.product_id - b.product_id
          )
        );
        setCurrentProduct(response.data.data[0].products[currentIndex]);
      } catch (error) {
        console.log(error);
      }
    }
    async function userFetch() {
      if (Object.keys(user).length) {
        try {
          const options = {
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}`,
          };
          const response = await axios.request(options);
          setCurrentIndex(response.data.data.survey_index - 1);
          fetchSurveys();
        } catch (error) {
          console.log(error);
        }
      }
    }
    userFetch();
  }, [user.survey_index, currentIndex, user, user.user_id]);

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

  const finishUserSurvey = async () => {
    try {
      const data = user;
      const options = {
        method: "PUT",
        url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/finishSurvey`,
        data: { data },
      };
      const response = await axios.request(options);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPointsForUser = async () => {
    try {
      const data = user;
      const options = {
        method: "PUT",
        url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/points`,
        data: { data },
      };
      const response = await axios.request(options);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleYes = async (e) => {
    e.preventDefault();
    async function updateYes() {
      try {
        const data = user;
        if (currentIndex < products.length - 1) {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/yes`,
            data: { currentProduct },
          };
          const options2 = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/advance`,
            data: { data },
          };
          const response1 = await axios.request(options);
          const response2 = await axios.request(options2);
          if (response1 && response2) {
            setLiked(false);
            setCurrentProduct(products[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
          }
        } else {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/yes`,
            data: { currentProduct },
          };
          const options2 = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/advance`,
            data: { data },
          };
          const response1 = await axios.request(options);
          const response2 = await axios.request(options2);
          if (response1 && response2) {
            const finishedUser = await finishUserSurvey();
            const pointsAdded = await addPointsForUser();
            if (finishedUser && pointsAdded) {
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    updateYes();
  };

  const handleNo = async (e) => {
    e.preventDefault();
    async function updateNo() {
      try {
        const data = user;
        if (currentIndex < products.length - 1) {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/no`,
            data: { currentProduct },
          };
          const options2 = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/advance`,
            data: { data },
          };
          const response = await axios.request(options);
          const response2 = await axios.request(options2);
          if (response && response2) {
            setLiked(false);
            setCurrentProduct(products[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
          }
        } else {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/no`,
            data: { currentProduct },
          };
          const options2 = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/advance`,
            data: { data },
          };
          const response = await axios.request(options);
          const response2 = await axios.request(options2);
          if (response && response2) {
            const finishedUser = await finishUserSurvey();
            const pointsAdded = await addPointsForUser();
            if (finishedUser && pointsAdded) {
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    updateNo();
  };

  const handleLike = async (e) => {
    const newLike = {
      product_id: currentProduct.product_id,
      user_id: user.user_id,
    };
    try {
      const options = {
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/likes`,
        data: { data: newLike },
      };
      const response = await axios.request(options);
      if (response) {
        reward();
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showTransition ? (
        <ShoeLoading />
      ) : (
        <div
          style={{ height: "90vh" }}
          className="d-flex align-items-center justify-content-center animate__animated animate__fadeIn"
        >
          <>
            {survey && currentProduct && likedProducts ? (
              <div className="card text-center" style={{ width: "30rem" }}>
                <div
                  className="card-header"
                  style={{ backgroundColor: "#000" }}
                >
                  <h5 className="mt-2">
                  {currentProduct.product_name.toLowerCase()}
                  </h5>
                </div>
                <div className="card-img">
                  <img
                    className="img-fluid"
                    src={currentProduct.product_img}
                    alt="product"
                  />
                </div>
                <div className="card-body display-me">
                  <p className="card-text">
                    {currentProduct.product_description.toLowerCase()}
                  </p>
                  <div>
                    <p>would you buy this?</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleYes}
                      className="btn btn-success w-100"
                    >
                      Yes
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleNo}
                      className="btn btn-danger mt-2 w-100"
                    >
                      No
                    </button>
                  </div>
                  <div className="mt-2 d-flex justify-content-between align-items-center">
                    <p className="d-flex align-items-center mt-3">
                      Product {currentIndex + 1} / {products.length}
                    </p>
                    <span id="rewardId" />
                    <span id="checkReward" />
                    {!liked && !likedProducts.filter( p => p.product_name === currentProduct.product_name).length ? (
                      <button
                        onClick={handleLike}
                        disabled={isAnimating}
                        className="p-3 px-4 like-button"
                      >
                        <AiFillHeart />
                      </button>
                    ) : (
                      <button
                        onClick={checkBox}
                        disabled={checkBoxAnimating}
                        className="p-3 px-4"
                      >
                        <BsCheckLg />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <ShoeLoading />
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
}
