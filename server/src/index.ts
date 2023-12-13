import express, { Express } from "express";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import cors from "cors"
const app: Express = express();

app.use(express.json())
app.use(cors())
app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
})

app.use(errorMiddleware)
app.listen(3000, () => {
  console.log("App working!");
});
