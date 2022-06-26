import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function LikeCard({ product, user }: any) {
  const navigate = useNavigate();
  const handleRemoveLike = async () => {
    if (
      window.confirm(
        "Do you want to remove this item from your likes? You cannot undo this action."
      )
    ){
      try {
        const setup = { product_id: product.product_id };
        const options = {
          method: "DELETE",
          url: `${process.env.REACT_APP_SERVER_URL}/users/${user.user_id}/likes`,
          data: { data: setup },
        };
        const response = await axios.request(options);
        if (response) {

          setTimeout(() => navigate(0), 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="card text-center" style={{ width: "30rem" }}>
      <div className="card-header" style={{ backgroundColor: "#000" }}>
        {product.product_name}
      </div>
      <div className="card-img">
        <img className="img-fluid" src={product.product_img} alt="product" />
      </div>
      <div className="card-body display-me">
        <p className="card-text">{product.product_description}</p>
        <button onClick={handleRemoveLike}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
