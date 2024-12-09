import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react"
import ProductCard from "./ProductCard";

const WatchesPage = () => {
    const [ products, setProducts] =  useState([]);

    useEffect(() => {
        const fetchProducts =  async() => {
            try {
                const response = await axios.get('http://localhost:7000/products/userProducts');
                setProducts(response.data)
            } catch (error) {
                console.log("Erro fetching products");
                
            }
        }
        fetchProducts();
    }, []);
    
    const watchProducts = products.filter(product => product.category === "watches");
    
    return(
        <div className="product-container">
            {watchProducts.map((product, index) => (
                <ProductCard
                key={index}
                name={product.title}
                price={product.price}
                desc={product.description}
                image={product.image}

                />
            ))}
        </div>
    );
};

export default WatchesPage;