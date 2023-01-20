import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter.js";
import videoRouter from "./routers/videoRouter.js";
import userRouter from "./routers/userRouter.js";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");  // Set the view engine
app.set("views", process.cwd() + "/src/views");  // Set the path of views

app.use(logger);
app.use(express.urlencoded({ extended: true }));  // For encoding of req.body
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;