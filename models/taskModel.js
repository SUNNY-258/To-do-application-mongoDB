const mongoose = require("mongoose");
mongoose.set("strictQuery" ,false);
const taskModel = new mongoose.Schema({
    title: String,
    desc: String,
    date: {
        type: Date,
        default: Date.now,
    },
})

const Task = mongoose.model("task", taskModel);

module.exports = Task;
