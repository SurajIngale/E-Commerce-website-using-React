import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    text: String,
    completed: {
        type: Boolean,
        default: false
    }
});

const Tasks = mongoose.model('Tasks', taskSchema, 'tasks');

export default Tasks;