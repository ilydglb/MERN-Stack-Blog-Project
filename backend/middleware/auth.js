import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
let user;

 const verifyJWT = (req, res, next) => {
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

import Post from "../models/postModel.js";
const isOwner = async (req,res,next)=>{

  const post = await Post.findById(req.params.id)
  // console.log("postedby id: ", post.postedBy)  //postun idsi
  // console.log("req userid: ",req.user.username)

  if (req.user.username !== req.user.username ) {
    return res.status(403).json({ error: 'You must be the owner' });
}
next(); 
}
const isAdmin = async (req,res,next)=>{

  const post = await Post.findById(req.params.id)
  // console.log("postedby id: ", post.postedBy)  //postun idsi
  // console.log("req userid: ",req.user.username)

  if ( req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You must be the admin' });
}
next(); 
}
const isOwnerOrAdmin = async (req,res,next)=>{

  const post = await Post.findById(req.params.id)
  // console.log("postedby id: ", post.postedBy)  //postun idsi
  // console.log("req userid: ",req.user.username)

  if (req.user.username !== req.user.username || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'You must be the owner' });
}
next(); 
}
export {verifyJWT, isOwnerOrAdmin};