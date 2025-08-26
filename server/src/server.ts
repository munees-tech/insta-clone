import express, { Request, Response } from "express";
import Db, { testConnection } from "./utils/db";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route";
import userRoute from "./routes/user.route"
import cors from "cors";
import "./models/association.model"
import path from "path";

console.log(path.resolve())



dotenv.config();
const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const staticPath = path.join(__dirname, "../../client/dist");
  const indexPath = path.join(__dirname, "../../client/dist/index.html");
  app.use(express.static(staticPath));
  app.use(/^\/(?!api).*/, (req: Request, res: Response) => {
    res.sendFile(indexPath);
  });
}


app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/post" , postRoute);
app.use("/api/user",userRoute)


app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
testConnection();

  await Db.sync();
});
