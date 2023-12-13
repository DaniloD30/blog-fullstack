import {Router} from 'express'
import { createPost, getAllPosts } from '../controllers/posts'
import { authMiddleware } from '../error-handler'

const postsRoutes: Router = Router()

postsRoutes.post('/createPost', authMiddleware(createPost))
//em teste
postsRoutes.get('/posts', authMiddleware(getAllPosts))
export default postsRoutes