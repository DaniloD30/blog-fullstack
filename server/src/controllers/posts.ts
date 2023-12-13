import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import {
  PostsSchema,
  PostsSchemaGetById,
  PostsSchemaOrderBy,
} from "../schema/posts";

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

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { order, userId } = PostsSchemaOrderBy.parse(req.body);
  const posts = await prismaClient.post.findMany({
    where: {
      userId: userId,
    },
    orderBy: [
      {
        date: order,
      },
    ],
  });

  res.json({ posts });
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idPost } = PostsSchemaGetById.parse(req.params);

  const post = await prismaClient.post.findMany({
    where: {
      id: +idPost,
    },
  });

  res.json({ post });
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idPost } = PostsSchemaGetById.parse(req.params);
  const { title, content, userId } = PostsSchema.parse(req.body);

   const postEdited = await prismaClient.post.update({
    where: {
      id: +idPost,
    },
    data: {
      title,
      content,
      userId
    },
  });
  res.json({ postEdited });
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idPost } = PostsSchemaGetById.parse(req.params);

  const post = await prismaClient.post.delete({
    where: {
      id: +idPost,
    },
  });
  res.json({ post });
};
