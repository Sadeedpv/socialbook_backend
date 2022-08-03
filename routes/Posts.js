import express from 'express'

// Controllers
import {addComment, addPosts, deletePost, getPosts, likePost, selectPost, updatePost} from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', addPosts);
router.get('/update/:id', selectPost)
router.post('/update/:id', updatePost)
router.delete('/delete/:id',deletePost )
router.patch('/likepost/:id', likePost)
router.patch('/addcomment/:id', addComment)



export default router;