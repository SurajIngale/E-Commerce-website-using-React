// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../assets/Usercss/card.css";
// import ProductCard from "./ProductCard";
// import ProductPage from "./productPage"

// const ProductContainer = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/products/userProducts');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="product-container">
//       {products.map((product, index) => (
//         <ProductCard ProductPage
//           key={index}
//           name={product.title}
//           review={product.review}
//           desc={product.description}
//           price={product.price}
//           image={product.image}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductContainer;
;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Usercss/card.css";
import ProductCard from "./ProductCard";
import ProductPage from "./productPage";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

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

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null); // Clear the selected product to show the list again
  };

  return (
    <div className="product-container">
      {selectedProduct ? (
        <ProductPage product={selectedProduct} onBack={handleBackToProducts} />
      ) : (
        products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.title}
            review={product.review}
            desc={product.description}
            price={product.price}
            image={product.image}
            onProductClick={() => handleProductClick(product)}
          />
        ))
      )}
    </div>
  );
};

export default ProductContainer;

