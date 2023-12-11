import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { LoginSchema, SignupSchema } from "../schema/users";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, pass } = SignupSchema.parse(req.body);

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (user) {
      next(
        new BadRequestsException(
          "User already exists!",
          ErrorCodes.USER_ALERADY_EXISTS
        )
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
  } catch (err: any) {
    next(
      new UnprocessableEntity(
        err?.issues,
        "Unprocessable entity",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, pass } = LoginSchema.parse(req.body);

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
  } catch (err: any) {
    next(
      new UnprocessableEntity(
        err?.issues,
        "Unprocessable entity",
        ErrorCodes.UNPROCESSABLE_ENTITY
      )
    );
  }
};
