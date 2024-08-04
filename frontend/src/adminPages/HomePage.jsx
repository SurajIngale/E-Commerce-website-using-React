import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/homepage.css";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/products/userProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = (products, num) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomProducts = getRandomProducts(products, 3);

  const phoneClick = () => {
    navigate("/user/smartphone");
  };
  const headphoneClick = () => {
    navigate("/user/headphones");
  };
  const tabClick = () => {
    navigate("/user/tabs");
  };

  return (
    <div className="homepage">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1722517307/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2024/Aug/02082024/Desktop/HP_Rotating_OP_2Aug2024_toqyt7.jpg"
            alt="First slide"
            onClick={phoneClick}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1722517306/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2024/Aug/02082024/Desktop/HP_Rotating_EP_2Aug2024_fbunvb.jpg"
            alt="Second slide"
            onClick={headphoneClick}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1722517308/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2024/Aug/02082024/Desktop/HP_Rotating_Tab_2Aug2024_ifmlvg.jpg"
            alt="Third slide"
            onClick={tabClick}
          />
        </Carousel.Item>
      </Carousel>

      <section id="products" className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {randomProducts.map((product, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={product.image} className="card-img-top product-img" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <a href="#" className="btn btn-primary">Add to Cart</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section container my-5">
        <h2 className="text-center mb-4">Why Shop With Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="info-card">
              <i className="fas fa-shipping-fast fa-3x mb-3"></i>
              <h5>Fast Shipping</h5>
              <p>Get your products delivered quickly and reliably.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card">
              <i className="fas fa-shield-alt fa-3x mb-3"></i>
              <h5>Secure Payments</h5>
              <p>All transactions are secure and encrypted.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card">
              <i className="fas fa-headset fa-3x mb-3"></i>
              <h5>24/7 Support</h5>
              <p>Our support team is here to help you anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section text-center py-5">
        <div className="container">
          <h2 className="mb-4">Subscribe to Our Newsletter</h2>
          <form className="newsletter-form">
            <input type="email" className="form-control" placeholder="Enter your email" />
            <button type="submit" className="btn btn-primary mt-3">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
