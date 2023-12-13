import {Router} from 'express'
import { createPost, getAllPosts, getPostById } from '../controllers/posts'
import { authMiddleware } from '../error-handler'

const postsRoutes: Router = Router()

postsRoutes.post('/createPost', authMiddleware(createPost))
//done 
postsRoutes.get('/posts', authMiddleware(getAllPosts))
// done
postsRoutes.get('/posts/:idPost', authMiddleware(getPostById))
export default postsRoutes