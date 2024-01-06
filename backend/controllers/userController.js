import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

  const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

    
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists');
    }

    const userNameTaken = await User.findOne({ username });

    if (userNameTaken) {
      res.status(400)
      throw new Error('Username is taken');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt)
  
  try{
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
  
  
       // generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        //token:generateToken(user._id) 
      });
      //console.log(res.data)
    } catch{
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
   // generateToken(res, user._id);


    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role:user.role,
      accessToken: generateToken(res, user._id)
    });

    
    // res.cookie('yourCookieName', 'cookieValue', { httpOnly: true });
    // res.status(200).json({message:'Cookie sent!'});

  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}); //login
  

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {

  req.headers.authorization ='';
  req.headers.Authorization ='';
  
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' })  //204-successful and no content to display
})




// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
 
  try{
    const id = req.user._id;
    res.status(200).json({
      user:`${id}`
     //_id: user._id,
    });
  }catch(err){
    res.status(404);
   // throw new Error('User not found');
  }
});



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username; //eğer girilmediyse olduğu gibi kalsın 
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

import Post from '../models/postModel.js';
const deleteUser = asyncHandler(async(req,res)=>{
 
  const username = req.user.username;
  const userId=req.user._id;

  //delete user's posts
  await Post.deleteMany({ postedBy: username });

  // Then delete the user
  const user = await User.findById(userId);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User and associated posts deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
  deleteUser};