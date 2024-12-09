// import React, { useState, useContext } from "react";
// import "../assets/Usercss/productPage.css";
// import CartContext from "./cartContext";
// import { useNavigate } from "react-router-dom";



// const ProductPage = ({ name, review, desc, price, image }) => {
//   const [quantity, setQuantity] = useState(0);
//   const [showDescription, setShowDescription] = useState(false);
//   const { addToCart } = useContext(CartContext);

//   const incrementQtyHandler = () => {
//     setQuantity(quantity + 1);
//   };

//   const decrementQtyHandler = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const displayDescription = () => {
//     setShowDescription(!showDescription);
//   };

//   const handleAddToCart = () => {
//     addToCart({ name, review, desc, price, image }, quantity);
//   };

//   const navigate = useNavigate();

//   const handleBuyClick = () => {
//     navigate("/order", { state: { product: {name, price } } });
//   };

//   return (
//     <div className="product-container product">
//       <img src={image} alt="" className="product-img " />
//       <h4 className="mb-0">{name}</h4>
//       <p>{review}</p>
//       <p className="rs m-0 mb-2">₹ {price}</p>
//       <p>{desc}</p>
//       <div className="quantitySelector">
//         <button onClick={decrementQtyHandler}>-</button>
//         <p>{quantity}</p>
//         <button onClick={incrementQtyHandler}>+</button>
//       </div>
//       <div className="card-button">
//         <button className="buy" onClick={handleBuyClick}>Buy</button>
//         <button className="addCart btn btn-close-white" onClick={handleAddToCart}>
//           Add To Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React from "react";

const ProductPage = ({ product, onBack }) => {
  if (!product) {
    return <div>No product details available</div>;
  }
  return (
    <div className="product-page">
      <button onClick={onBack}>Back to Products</button>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <p>Review: {product.review}</p>
      {/* Add any other product details you want to display */}
    </div>
  );
};

export default ProductPage;

