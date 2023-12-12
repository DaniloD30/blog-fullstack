import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { UnauthorizedException } from "./exceptions/unauthorized";
import * as jwt from "jsonwebtoken";
import { prismaClient } from ".";
export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCodes.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};

export const authMiddleware = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
  
        if (!token) {
          throw new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED);
        }
    
        const payload = jwt.verify(token, "secretKeyBlogFullStack") as any;
       
        const user = await prismaClient.user.findFirst({
          where: { id: payload.userId },
        });
    
        if (!user) {
          throw new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED);
        }
        await method(req, res, next);
      } catch (error: any) {
        let exception: HttpException;
        if (error instanceof HttpException) {
          exception = error;
        } else {
          exception = new InternalException(
            "Unauthorized!",
            error,
            ErrorCodes.UNAUTHORIZED
          );
        }
        next(exception);
      }
    };
  };