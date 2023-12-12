import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { PostsSchema } from "../schema/posts";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, userId } = PostsSchema.parse(req.body);

  const task = await prismaClient.post.create({
    data: {
      title,
      content,
      userId,
    },
  });

  res.json({ task });
};
