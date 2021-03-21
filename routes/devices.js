var express = require('express');
const { authToken } = require('../middlewares/auth');
const {DeviceModel,validDevice} = require("../models/deviceModel")
var router = express.Router();
// mongoConect = mongodb+srv://elhadiAhmad:elhadi@cluster0.sth5j.mongodb.net/test

/* GET home page. */
router.get('/', async(req, res,)=> {

  let data =  await DeviceModel.find({})
  
  res.json(data)

  // DeviceModel.find({})
  // .then(data =>{

  //   res.json(data)
 // })
 
});

router.get("/cat/:catId", async(req, res)=>{
  let catId = req.params.catId;
  let data = await DeviceModel.find({company_id:catId})
  res.json(data);


})

router.get("/search/",async(req,res)=>{
  let searchQ = req.query.q;
  let seaschQRegExp = new RegExp(searchQ,"i")
  let data = await DeviceModel.find({name:seaschQRegExp})
  res.json(data)
})


///// authToken  add here becous can not add new devices without have a token and your id
router.post("/", authToken, async(req,res)=>{

  let validBody = validDevice(req.body);

  if(validBody.error){

   return res.status(400).json(validBody.error.details)
  }

  

  let device = new DeviceModel(req.body)
  /////to add user id when you adding ner device
  device.user_id = req.tokenData._id;
  await device.save();
  res.json(device);
})


router.delete("/:idDel",authToken,async(req,res)=>{
  let idDel = req.params.idDel;
  let data = await DeviceModel.deleteOne({_id:idDel,user_id:req.tokenData._id});
  res.json(data)
})

router.put("/:idEdit",authToken,async(req,res)=>{

  let idEdit = req.params.idEdit;
  let validBody = validDevice(req.body);
  if(validBody.error){

    return res.status(400).json(validBody.error.details);
  }
  let data = await DeviceModel.updateOne({_id:idEdit,user_id:req.tokenData._id},req.body);
  res.json(data)
})

module.exports = router;
