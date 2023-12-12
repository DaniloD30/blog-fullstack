import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { LoginSchema, SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, pass } = SignupSchema.parse(req.body);

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    new BadRequestsException(
      "User already exists!",
      ErrorCodes.USER_ALERADY_EXISTS
    );
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, pass } = LoginSchema.parse(req.body);

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw new NotFoundException("User not found.", ErrorCodes.USER_NOT_FOUND);
  }
  if (!compareSync(pass, user.pass)) {
    throw new BadRequestsException(
      "Incorrect Password",
      ErrorCodes.INCORRECT_PASSWORD
    );
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
