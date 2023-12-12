import {Router} from 'express'
import { createPost } from '../controllers/posts'
import { authMiddleware } from '../error-handler'

const postsRoutes: Router = Router()

postsRoutes.post('/createPost', authMiddleware(createPost))

export default postsRoutes