import express from 'express';
const router = express.Router();
import { createPost, showPosts, showSinglePost, deletePost, updatePost } from '../controllers/postController.js';
import { verifyJWT, isOwnerOrAdmin } from '../middleware/auth.js';

router.post('/create', verifyJWT, createPost);

router.get('', showPosts).get('/:id', showSinglePost);

router.delete('/:id', verifyJWT, isOwnerOrAdmin , deletePost).put('/:id',verifyJWT,isOwnerOrAdmin, updatePost);

//(req) =>(req) ? isOwner:isAdmin
// router.put('/comment/post/:id', isAuthenticated, addComment);
// router.put('/addlike/post/:id', isAuthenticated, addLike);
// router.put('/removelike/post/:id', isAuthenticated, removeLike);


export default router;