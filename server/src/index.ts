import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";

const app: Express = express();

app.use(express.json())
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.listen(3000, () => {
  console.log("App working!");
});
