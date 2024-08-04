import Users from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        let users = await Users.find({});
        if(users){
            res.send(users);
        } else {
            res.send("No user found");
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await Users.findByIdAndUpdate(id, req.body, { new: true });
        res.send(updateduser);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user");
    }
};

export const deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndDelete(id);
        res.send("user deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting user");
    }
};


