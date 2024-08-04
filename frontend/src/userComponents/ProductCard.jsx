import React, { useState, useContext } from "react";
import "../assets/Usercss/card.css";
import CartContext from "./cartContext";
import { useNavigate } from "react-router-dom";



const ProductCard = ({ name, review, desc, price, image }) => {
  const [quantity, setQuantity] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const { addToCart } = useContext(CartContext);

  const incrementQtyHandler = () => {
    setQuantity(quantity + 1);
  };

  const decrementQtyHandler = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const displayDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAddToCart = () => {
    addToCart({ name, review, desc, price, image }, quantity);
  };

  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate("/order", { state: { product: {name, price } } });
  };

  return (
    <div className="card">
      <img src={image} alt="" className="card-img" />
      <h4 className="mb-0">{name}</h4>
      <p>{review}</p>
      <p className="rs m-0 mb-2">₹ {price}</p>
      <button className="desc" onClick={displayDescription}>
        Description ▼
      </button>
      {showDescription && (
        <div className="description-content">
          <p>{desc}</p>
        </div>
      )}
      <div className="quantitySelector">
        <button onClick={decrementQtyHandler}>-</button>
        <p>{quantity}</p>
        <button onClick={incrementQtyHandler}>+</button>
      </div>
      <div className="card-button">
        <button className="buy" onClick={handleBuyClick}>Buy</button>
        <button className="addCart" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
