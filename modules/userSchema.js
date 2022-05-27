
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required:[true, "Name of new user must be provided"]},
    email : {type:String, required: [true, "Email of new user must be provided"]},
    password: {type: String, required: [true, "Password of new user must be provided"]}
})


module.exports = mongoose.model("User", userSchema)
