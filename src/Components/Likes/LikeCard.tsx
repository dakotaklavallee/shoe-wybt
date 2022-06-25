import React from "react";

export default function LikeCard({ product }: any) {
  return (
    <div className="card text-center" style={{ width: "30rem" }}>
      <div className="card-header" style={{ backgroundColor: "#000" }}>
        {product.product_name}
      </div>
      <div className="card-img">
        <img src={product.product_img} alt="product" />
      </div>
      <div className="card-body display-me">
        <p className="card-text">{product.product_description}</p>
        <button></button>
      </div>
    </div>
  );
}
