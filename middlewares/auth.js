const jwt = require("jsonwebtoken");
exports. authToken = (req,res,next)=>{

  let token = req.header("auth-token");
  if(!token){
    return res.status(401).json({message:"You must send token to this url"});
  }
  try{


    let decodeToken = jwt.verify(token,"elhadiRagabbat");
    //   // req is prams sheared for all funcation in same router
//   req .tokenData = decodeToken;
//   //if seccess call next func
    req.tokenData = decodeToken;
    next()


  }
  catch(err){

    return res.status(401).json({message:"token invalid or expired"});
  }
}