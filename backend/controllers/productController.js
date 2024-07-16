import Products from "../models/productModel.js";

export const addProducts = async (req, res) => {
    const { title, description, price, image, category } = req.body;
    try {
      const newProduct = new Products({ title, description, price, image, category });
      await newProduct.save();
      res.status(201).json(newProduct);  
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error});
    }
}

export const getAllProducts = async (req, res) => {
    try {
        let products = await Products.find({});
        if(products){
            res.send(products);
        } else {
            res.send("No product found");
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });
        res.send(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating product");
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Products.findByIdAndDelete(id);
        res.send("Product deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting product");
    }
};
