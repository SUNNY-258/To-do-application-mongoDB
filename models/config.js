const mongoose = require("mongoose");
mongoose.set("strictQuery" ,false);
mongoose.connect("mongodb://localhost/To-do")

.then(function(){
    console.log("database connected!");

})

.catch(function(error) {
    console.log(error.message)
})
