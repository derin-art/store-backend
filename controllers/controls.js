const Item = require("../modules/itemSchema.js")
require("express-async-errors")
const CustomError = require('../CutomError/CustomError')
const { fstat } = require("fs")
const fs = require("fs")
const path = require("path")


const getAllitems = async(req, res, next)=>{
    const items = await Item.find({})
  
    if(!items){
        throw new CustomError("Unsuccessful data", 404)
    }

    res.status(200).json({msg: "successful", data: items})
   

}


const deleteItem = async(req, res, next)=>{
        const {id: itemID} = req.params
        const item = await Item.findOneAndDelete({_id: itemID})
        if(!item){
            throw new CustomError(`The item of id ${itemID} doesn't exist`, 404)
        }
        res
        .status(200)
        .json({msg: "success", data: item})
    
 
}

const getSingleItem = async(req, res, next)=>{
   
        const {id} = req.params
        const item = await Item.findOne({_id: id})
        if(!item){
            throw new CustomError(`The item of id ${id} doesn't exist`, 404)
        }
        res
        .status(200)
        .json({msg: "succesful", data: item})
  
}

const createItems = async(req, res, next)=>{
/*     res.set('Access-Control-Allow-Origin', '*') */
  /*   img: req.body.img, */
    console.log(req.body)
    console.log("get it")
    if(!req.file){
        throw new CustomError("No file present", 400)
    }
    console.log(__dirname)
    const uploadsDir = "C:/Users/owoad/Downloads/store-main/store-main/backend"
    console.log(req.file)
        const urlData = fs.readFileSync(path.join( __dirname + "/uploads/" + req.file.originalname), {encoding: 'base64'}).toString()
        console.log("heyyy")
        const item = await Item.create({
            name: req.body.name,
            price: req.body.price,
        /*     img: {
                data: urlData,
                contentType : "image/png"
            }, */
            img: urlData,
            description: req.body.description
            
        })
        if(!item){
            console.log("failed")
            throw new CustomError("Creation error", 500)
            return
        }
        res
        .header("Access-Control-Allow-Origin" , "*")
        .status(200)
        .json({msg: "successful", data: item})
   
}

const createItems2 = async(req, res, next)=>{
    console.log("is working")
    const {name, price, img, description} = req.body
    const item = await Item.create({
        name, price, img, description
    })
    res
    .header("Access-Control-Allow-Origin" , "*")
    .status(200)
    .json({msg: "successful", data: item})
}

const deleteAll = async (req, res, next)=>{
    console.log("Could be")
    const items = await Item.deleteMany({price: 120})
    console.log(items)
    const {acknowledged, deletedCount } = items
    res.status(200).json({msg: "success items deleted"})
}

const editItem = async(req, res, next)=>{
       
        const {id} = req.params
        console.log(id)
        const {name, price} = req.body
    
        if(req.file){
            console.log("hey")
            const urlData = fs.readFileSync(path.join( __dirname + "/uploads/" + req.file.originalname), {encoding: 'base64'}).toString()
            const item = await Item.findOneAndUpdate({_id: id}, {name, price, img:urlData}, {new: true, runValidators: true})
            if(!item){
                throw new CustomError(`The item of id ${id} doesn't exist`, 404)
            }
            res
            .status(200)
            .json({msg: "success", data: item})
            return

        }
      
            const item = await Item.findOneAndUpdate({_id: id}, {name, price}, {new: true, runValidators: true})
            if(!item){
                throw new CustomError(`The item of id ${id} doesn't exist`, 404)
            }
            res
            .status(200)
            .json({msg: "success", data: item})
            return
        
      

        
   
   

}

module.exports = {getAllitems, createItems, getSingleItem, deleteItem, editItem, deleteAll}





