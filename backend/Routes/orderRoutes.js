import express from 'express'
import { addOrder, getAllOrders } from '../controllers/orderController.js';
import authMiddleware, { verifyAdmin } from '../authMiddleware.js';

const route = express.Router();

route.post('/addOrder', addOrder);
route.post('/getAllOrders', getAllOrders)

export default route;