import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoeLoading from "../Transitions/ShoeLoading";
export default function Survey({ showTransition, handleTransition }: any) {
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
  console.log(currentProduct);

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
        setCurrentProduct(response.data.data[0].products[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSurveys();
  }, []);

  const handleYes = async (e) => {
    e.preventDefault();
    async function updateYes() {
      try {
        if (currentIndex < products.length - 1) {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/yes`,
            data: { currentProduct },
          };
          const response = await axios.request(options);
          if (response) {
            setCurrentProduct(products[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
            console.log(response, "got em");
          }
        } else {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/yes`,
            data: { currentProduct },
          };
          const response = await axios.request(options);
          if (response) {
            console.log(response, "finished");
            navigate("/");
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
        if (currentIndex < products.length - 1) {
          const options = {
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}/products/${currentProduct.product_id}/no`,
            data: { currentProduct },
          };
          const response = await axios.request(options);
          if (response) {
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
          const response = await axios.request(options);
          if (response) {
            console.log(response, "finished");
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    updateNo();
    console.log("Went through");
  }

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
              <div 
              className="card text-center"
              style={{width:"30rem"}}
              >
                <div
                  className="card-header"
                  style={{ backgroundColor: "#000" }}
                >
                  {currentProduct.product_name}
                </div>
                <div className="card-img">
                  <img className="img-fluid" src={currentProduct.product_img} alt="product" />
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
                <h3>Loading...</h3>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
}
