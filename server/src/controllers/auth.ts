import { Request, Response } from "express";
import { prismaClient } from ".."; 
import {hashSync} from "bcrypt";
// name  String
// email String @unique
// pass  String
export const signup = async (req: Request, res: Response) => {
  const { name, email, pass } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  
  if (user) {
    throw Error("User already exists!");
  }
  
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      pass: hashSync(pass, 10),
    },
  })
  res.json(user);
};
