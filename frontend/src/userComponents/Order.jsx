import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Order = () => {

  const location = useLocation();
  const { product } = location.state;
  console.log(product);

  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    mobile: "",
    paymentMethod: "Credit Card",
    product: {
      productName: product.name, 
      price: product.price,
  },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { ...orderDetails };
    try {
      await axios.post("http://localhost:7000/orders/addOrder", orderData);
      alert("Order placed successfully!");
      navigate("/user/home");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <h2>Order a {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={orderDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={orderDetails.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={orderDetails.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            className="form-control"
            id="paymentMethod"
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <h4>Product Details</h4>
          <p><strong>Title:</strong> {product.name}</p>
          <p><strong>Price:</strong> {product.price}</p>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Order;
