import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const authMiddleware=async (req,res,next)=>{
  const token = req.header('Authorization');
  if(!token){
    return res.status(401).send({message:"Unauthorized http request"});
  }
  const jwtToken=token.replace('Bearer ',"").trim();
  
  try {
    const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
    const userData=await User.findOne({email:isVerified.email}).select({password:0})
    console.log(userData);
    req.user=userData;
    req.token=token;
    req.userID=userData._id;
    next();
  } catch (error) {
    return res.status(401).json({message:"Unauthorized http request"+error.message});
  }
}


export default authMiddleware;