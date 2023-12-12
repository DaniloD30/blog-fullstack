import { z } from 'zod'

export const PostsSchema = z.object({
    title: z.string(),
    content: z.string(),
    userId: z.number()
})
