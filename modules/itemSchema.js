const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {type:String, required:[true, "must provide name"], maxlength:[30, "name cannot exceed 30 characters"]},
    price: {type:Number, required: [true, "must provide price"]},
    comments: [{body:String, date:Date}],
   /*  img:{data:Buffer,contentType: String}, */
 /*   img: {type: String, data: Buffer}, */
    img : {type: String},
    rating: {
        type: Number},
    description : {type: String}
})


/* const Model = */ 
module.exports = mongoose.model("Item", itemSchema)
