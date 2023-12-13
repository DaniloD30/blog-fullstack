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
//Done
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
//Done

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
//setar rota
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
      userId,
    },
  });
};
//setar rota
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idPost } = PostsSchemaGetById.parse(req.params);

  const task = await prismaClient.post.delete({
    where: {
      id: +idPost,
    },
  });
};
