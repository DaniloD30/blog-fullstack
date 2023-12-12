import { Router } from "express";
import authRoutes from "./auth";
import postsRoutes from "./posts";
const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/blog', postsRoutes)
export default rootRouter