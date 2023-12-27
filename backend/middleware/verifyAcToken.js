import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {  //if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    return res.status(401).json({ error: 'Unauthorized: Missing Authorization Header' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET,async (err, decoded) => {

        try{  req.user = await User.findById(decoded.userId).select('-password')}catch(err){console.log(err)}
        //console.log(decoded.userId)
    if (err) {
      console.error(err); // Log the error for debugging
      return res.status(403).json({ error: 'Forbidden: Invalid Token' });
    }


    next();
  });
};