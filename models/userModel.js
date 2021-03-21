const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const usersSchema = new mongoose.Schema({

    email:String,
    pass:String,
    name:String,
    date_created:{
        type:Date , default:Date.now()
    }
})

exports.UserModel = mongoose.model("users",usersSchema);

exports.genToken = (_id)=>{
    let token = jwt.sign({_id:_id},"elhadiRagabbat",{expiresIn:"60mins"})
    return token;
}

exports.validUser = (_bodyData)=>{

    let joiSchema = Joi.object({
        name :Joi.string().min(2).max(100).required(),
        pass:Joi.string().min(1).max(10).required(),
        email:Joi.string().min(4).max(100).email().required(),
     
    })
    return joiSchema.validate(_bodyData)
}


exports.validLogin = (_bodyData)=>{

    let joiSchema = Joi.object({
       
        pass:Joi.string().min(1).max(10).required(),
        email:Joi.string().min(4).max(100).email().required(),
     
    })
    return joiSchema.validate(_bodyData)
}