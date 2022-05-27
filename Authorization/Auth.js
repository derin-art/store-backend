
const userModel = require("../modules/userSchema.js")
require("express-async-errors")
const CustomError = require("../CutomError/CustomError.js")

const createUser = async (req, res)=>{
   const userAlreadyExist = await userModel.findOne({ 
      email: req.body.email})
   
   const userNameAlreadyexist = await userModel.findOne({
      name: req.body.name
   })
      if(userAlreadyExist || userNameAlreadyexist){
         console.log("whats the do")
         throw new CustomError("This user already exist", 400)
      }  
      const user =  await  userModel.create({
         name: req.body.name, 
         email: req.body.email,
         password: req.body.password
       })
       res.status(200).json(user)
    
  
}

const getAllUsers = async (req, res)=>{
   const users = await userModel.find({})
   res.status(200).json(users)
}

const verifyUser = async (req, res)=>{
   const {email, password} = req.body
   console.log({email, password})
   const user = await userModel.findOne({email, password})
   if(!user){
      throw new CustomError("This user does not exist", 404)
   }
   res.status(200).json(user)
}

module.exports = {createUser, verifyUser, getAllUsers}