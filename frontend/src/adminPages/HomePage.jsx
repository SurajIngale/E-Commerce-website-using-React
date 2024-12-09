import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/homepage.css";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "../assets/css/homepage.css"

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/products/userProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
  const tvClick = () => {
    navigate("/user/tv");
  };
  const laptopClick = () => {
    navigate("/user/laptops");
  };
  const watchClick = () => {
    navigate("/user/watches");
  };

  const navigateToLogin = () => navigate("/user/login");
  const navigateToRegister = () => navigate("/register");

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container-fluid">
        <ScrollLink
          to="top"
          smooth={true}
          duration={500}
          className="navbar-brand text-light"
        >
          MyApp
        </ScrollLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <ScrollLink
                to="product-types"
                smooth={true}
                duration={10}
                className="nav-link"
                activeClass="active"
              >
                Shop
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="products"
                smooth={true}
                duration={10}
                className="nav-link"
                activeClass="active"
              >
                About
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="info-section"
                smooth={true}
                duration={10}
                className="nav-link"
                activeClass="active"
              >
                Contact
              </ScrollLink>
            </li>
          </ul>
          <div>
            <button
              className="btn btn-outline-light me-2"
              onClick={navigateToLogin}
            >
              Login
            </button>
            <button
              className="btn btn-light"
              onClick={navigateToRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>


      {/* Main Content */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1722517307/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2024/Aug/02082024/Desktop/HP_Rotating_OP_2Aug2024_toqyt7.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1722517306/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2024/Aug/02082024/Desktop/HP_Rotating_EP_2Aug2024_fbunvb.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1722517308/Croma%20Assets/CMS/Homepage%20Banners/HP%20Rotating/2024/Aug/02082024/Desktop/HP_Rotating_Tab_2Aug2024_ifmlvg.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <section id="product-types" className="container justify-content-center d-flex row my-5">
        <h1 className="text-center mb-4">Product Categories</h1>
       <div className="d-flex">
       <div>
          <img onClick={phoneClick} src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746332/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Mobile_sdtrdf.png?tr=w-720" alt="" />
        </div>
        <div>
          <img onClick={tvClick} src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746346/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/TV_vdemgc.png?tr=w-720" alt="" />
        </div>
        <div>
          <img onClick={laptopClick} src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746331/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Laptops_pzewpv.png?tr=w-720" alt="" />
        </div>
        <div>
          <img onClick={headphoneClick} src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746312/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Head_set_xjj934.png?tr=w-720" alt="" />
        </div>
        <div>
          <img onClick={tabClick} src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1717746345/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/Homepage%20Cat%20Icons-Desktop/Tablets_yzod4f.png?tr=w-720" alt="" />
        </div>
        <div>
          <img onClick={watchClick} src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1718616448/Croma%20Assets/CMS/LP%20Page%20Banners/2024/HP%20Category%20Ic0on/June/17th/Desktop/Wearables_iunu7h.png?tr=w-720" alt="" />
        </div>
       </div>
        {/* Existing Product Types Code */}
      </section>

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
        {/* Existing Featured Products Code */}
      </section>

      <section id="info-section" className="container my-5">
      <h2 className="text-center text-light mb-4">Why Shop With Us?</h2>
        <div className="row text-light-emphasis">
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
        {/* Existing Info Section Code */}
      </section>

      <section id="newsletter-section" className="newsletter-section text-center py-5">
      <div className="container">
          <h2 className="mb-4">Connect With Us</h2>
          <form className="newsletter-form">
            <input type="email" className="form-control" placeholder="Enter your email" />
            <button type="submit" className="btn btn-dark mt-3">Connect</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
