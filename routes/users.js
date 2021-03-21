var express = require('express');
const becrypt = require("bcrypt");
const _ = require("lodash")
const {authToken} = require("../middlewares/auth")
const jwt = require("jsonwebtoken");
const {UserModel,validUser,validLogin,genToken} = require("../models/userModel")
var router = express.Router();

/* GET users listing. */
router.get('/',async (req, res)=> {
  let data = await UserModel.find({})
  res.json(data)
  // res.send('respond with a resource');
});

// const authToken = (req,res,next)=>{


//   let token = req.header("auth-token");
//   if(!token){
//     return res.status(401).json({message:"you must send token"})
//   }

//   try{
//   let decode = jwt.verify(token,"elhadiRagabbat");

//   // req is prams sheared for all funcation in same router
//   req .tokenData = decode;
//   //if seccess call next func
//   next();
  
// }
// catch(err){

//  return res.status(401).json({mes:"invalid or expired tokten"})
// }

// }


//route info or token
router.get("/userInfo",authToken,async(req,res)=>{

  try{

    let user = await UserModel.findOne({_id:req.tokenData._id},{pass:0})
    res.json(user)
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }

 
})




/// route login
router .post("/login" , async(req,res)=>{

  
  let validBody = validLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }
  try{

    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({message:"user is not found"})
    }

    let validPass = await becrypt.compare(req.body.pass,user.pass)
    if(!validPass){

      return res.status(400).json({message:"password invalid"})

    }

    let newToken = genToken(user._id);


    res.json({token:newToken});
  }
  catch(err){
    console.log(err)
    res.status(400).json(err)
  }

})

router.post("/",async(req,res)=>{

  let validBody = validUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details)
  }

  try{
  let user = new UserModel(req.body)
  let salt = await becrypt.genSalt(10);
  user.pass = await becrypt.hash(user.pass,salt)

  await user.save();
  res.status(201).json(_.pick(user,["_id","date_created","name","email"]))
  }
  catch(err){
    console.log(err)
    if(err.keyPattern){

      return  res.status(400).json({massage:"Email is already in system"})
    }
    res.status(400).json(err)
  }


})

module.exports = router;
