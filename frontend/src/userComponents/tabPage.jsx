import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard";

const TabPage = () => {
    const [products, setProducts] = useState([])
        useEffect (() => {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get("http://localhost:7000/products/userProducts");
                    setProducts(response.data);
                } catch (error) {
                    console.log("Error fetching products", error);
                }
            };

            fetchProducts();
        }, []);

        const tabProducts = products.filter(product => product.category === "Tablets");

        return(
            <div className="product-container">
                {tabProducts.map((product, index) => (
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

export default TabPage;