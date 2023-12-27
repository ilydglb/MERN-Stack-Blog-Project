import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { handleRefreshToken } from '../controllers/refreshTController.js';
//import { protect } from '../middleware/authMiddleware.js';
import {verifyJWT} from '../middleware/verifyAcToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/auth', authUser);

router.get('/refresh',handleRefreshToken)

router.post('/logout', logoutUser);
router.route('/profile').get(verifyJWT, getUserProfile).put(verifyJWT, updateUserProfile);

export default router;