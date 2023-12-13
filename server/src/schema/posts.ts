import { z } from "zod";

export const PostsSchema = z.object({
  title: z.string(),
  content: z.string(),
  userId: z.number(),
});

export const PostsSchemaGetById = z.object({
  idPost: z.string(),
});

export const PostsSchemaOrderBy = z.object({
  order: z.enum(["asc", "desc"]),
  userId: z.number().optional(),
});
