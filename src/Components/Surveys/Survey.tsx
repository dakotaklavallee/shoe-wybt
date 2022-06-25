import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoeLoading from "../Transitions/ShoeLoading";
export default function Survey({ showTransition, user }: any) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
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
  console.log(currentIndex);

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
      try {
        const options = {
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}`,
        };
        const response = await axios.request(options);
        console.log(response.data.data);
        setCurrentIndex(response.data.data.survey_index - 1);
        fetchSurveys();
      } catch (error) {
        console.log(error);
      }
    }
    userFetch();
  }, [user.survey_index, currentIndex, user.user_id]);

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
        console.log(response, "Finished User");
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
        console.log(response, "Added Points");
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
            setCurrentProduct(products[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
            console.log(response1, response2, "got em");
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
              console.log(response1, response2, "finished");
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    updateYes();
    console.log("Went through");
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
            setCurrentProduct(products[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
            console.log(response, "got em");
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
              console.log(response, response2, "finished");
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    updateNo();
    console.log("Went through");
  };

  return (
    <div>
      {showTransition ? (
        <ShoeLoading />
      ) : (
        <div
          style={{ height: "90vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <>
            {survey && currentProduct ? (
              <div className="card text-center" style={{ width: "30rem" }}>
                <div
                  className="card-header"
                  style={{ backgroundColor: "#000" }}
                >
                  {currentProduct.product_name}
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
                    {currentProduct.product_description}
                  </p>
                  <div>
                    <p>would you buy this?</p>
                    <button
                      type="button"
                      onClick={handleYes}
                      className="btn btn-secondary"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={handleNo}
                      className="btn btn-danger ml-2"
                    >
                      No
                    </button>
                  </div>
                  <div className="mt-2">
                    <p>
                      Product {currentIndex + 1} / {products.length}
                    </p>
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
