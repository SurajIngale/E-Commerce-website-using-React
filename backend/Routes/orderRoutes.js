import express from 'express'
import { addOrder } from '../controllers/orderController.js';

const route = express.Router();

route.post('/addOrder', addOrder);

export default route;