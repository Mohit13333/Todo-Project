import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP request" });
  }

  try {
    const jwtToken = token.replace('Bearer ', "").trim();

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findById(isVerified.userId).select({password:0}); 
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Please login" });
  }
};

export default authMiddleware;