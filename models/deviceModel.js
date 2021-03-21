const mongoose = require("mongoose");
const Joi =  require("joi");

const deviceSchema = new mongoose.Schema({

    name:String,
    company_id:String,
    battery_score:Number,
    camera_score:Number,
    user_id:String,
    price:Number
})
exports.DeviceModel = mongoose.model("devices",deviceSchema);

exports.validDevice = (_bodyData)=>{

    let joiSchema = Joi.object({
        name :Joi.string().min(2).max(100).required(),
        company_id:Joi.string().min(1).max(10).required(),
        battery_score:Joi.number().min(1).max(100).required(),
        camera_score:Joi.number().min(1).max(100).required(),
        price:Joi.number().min(1).max(9999).required(),
    })
    return joiSchema.validate(_bodyData)
}

