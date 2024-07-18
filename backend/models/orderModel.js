import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: String,
    address: String,
    mobile: Number,
    paymentMethod : String,
    product: {
        title: String,
        price: Number,
    },
    createdAt: {type: Date, default: Date.now},
});
const Orders = mongoose.model('orders', orderSchema);

export default Orders;