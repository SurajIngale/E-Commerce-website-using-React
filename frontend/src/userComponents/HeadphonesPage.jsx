import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Usercss/card.css";
import ProductCard from "./ProductCard";

const HeadPhonePage = () => {
  const [products, setProducts] = useState([]);

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

  const headphonesProducts = products.filter(product => product.category === "Headphones");

  return (
    <div className="product-container">
      {headphonesProducts.map((product, index) => (
        <ProductCard
          key={index}
          name={product.title}
          review={product.review}
          desc={product.description}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default HeadPhonePage;
