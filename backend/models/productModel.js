import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        isArchived: Boolean
    }, { versionKey: false }

)
const Products = mongoose.model('products', productSchema,);

export default Products;