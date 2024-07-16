import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userName: String,
    productName: String,
    address: String,
    mobileNumber: Number
})
const Orders = mongoose.model('orders', orderSchema);

export default Orders;