import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
// name  String
// email String @unique
// pass  String
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, pass } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
     next(new BadRequestsException(
      "User already exists!",
      ErrorCodes.USER_ALERADY_EXISTS
    ));
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      pass: hashSync(pass, 10),
    },
  });
  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, pass } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw Error("User does not exists!");
  }
  if (!compareSync(pass, user.pass)) {
    throw Error("Incorrect password!");
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    "secretKeyBlogFullStack"
  );

  let userData = {
    ...user,
    pass: "",
  };

  res.json({ userData, token });
};
