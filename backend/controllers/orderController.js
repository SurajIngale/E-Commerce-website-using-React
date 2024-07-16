import Orders from "../models/orderModel.js";

export const addOrder = async (req, res) => {
    const { name, productName, address, mobileNumber } = req.body;
    try {
        const newOrder = new Orders({ name, productName, address, mobileNumber });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "error adding order", error});
    }
}