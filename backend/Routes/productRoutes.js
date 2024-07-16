import express from "express";
import { getAllProducts, updateProduct, deleteProduct, addProducts } from "../controllers/productController.js";
// import authMiddleware, { verifyAdmin } from "../authMiddleware.js";

const route = express.Router();

route.get('/', getAllProducts);
route.post('/addProducts', addProducts)
route.put('/:id', updateProduct);
route.delete('/:id', deleteProduct);

export default route;
