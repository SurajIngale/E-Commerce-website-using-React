import Orders from "../models/orderModel.js";

export const addOrder = async (req, res) => {
    try {
        const newOrder = new Orders(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);   
    } catch (error) {
        res.status(500).json({ error: "Error adding Order", error})
    }
}

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Orders.find({});
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  };