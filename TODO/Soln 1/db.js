const mongoose = require('mongoose');

mongoose.connect("Your MongoDB Compass URL/Database Name");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo
};