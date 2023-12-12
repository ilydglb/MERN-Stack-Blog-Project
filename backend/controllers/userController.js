import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

  // @access  Public yani register olduktan sonra login olmuyor
  const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt)
  
  try{
    const user = await User.create({
      name,
      email,
      hashedPassword,
    });
  
  
        generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        //token:generateToken(user._id) //demedik
      });
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
    generateToken(res, user._id);

 
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}); //login
  

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' })
})




// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
 
  try{
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  }catch(err){
    res.status(404);
    throw new Error('User not found');
  }
   
});



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; //eğer girilmediyse olduğu gibi kalsın 
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,};