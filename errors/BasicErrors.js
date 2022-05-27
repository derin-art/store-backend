const CustomError = require("../CutomError/CustomError")

const basicError = (err, req, res, next)=>{
    if(err instanceof CustomError){
            console.log("hey")
           return res
           .status(err.statusCode)
           .json({msg: err.message, status: err.statusCode})
    }
    
     return res.status(500).json(err)
}

const notFoundError = (req, res)=>{
    res.status(404).send("This page doesn't exist")
}

module.exports = {basicError, notFoundError}