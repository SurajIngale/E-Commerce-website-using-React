import express from "express";
import { getAllProducts, updateProduct, deleteProduct, addProducts } from "../controllers/productController.js";
import authMiddleware, { verifyAdmin } from "../authMiddleware.js";

const route = express.Router();

route.get('/',authMiddleware, verifyAdmin, getAllProducts);
route.post('/addProducts', authMiddleware, verifyAdmin, addProducts)
route.put('/:id', authMiddleware, verifyAdmin, updateProduct);
route.delete('/:id', authMiddleware, verifyAdmin,deleteProduct);
route.get('/userProducts', getAllProducts);

export default route;
