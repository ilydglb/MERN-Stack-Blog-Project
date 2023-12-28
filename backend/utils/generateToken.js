import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '10m'} //10m
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '15d'}
      );
  

  // res.cookie('jwjt', refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
  //   sameSite: 'None', //strict for Prevent CSRF attacks
  // //  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  // });

  res.cookie('jwt', refreshToken, { httpOnly: true });
 //   res.status(200).json({message:'Cookie sent!'});
 return accessToken //res.json(accessToken)
};

export default generateToken;  