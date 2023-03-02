import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter.js";
import videoRouter from "./routers/videoRouter.js";
import userRouter from "./routers/userRouter.js";
import { localsMiddleware } from "./middlewares.js";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");  // Set the view engine
app.set("views", process.cwd() + "/src/views");  // Set the path of views

app.use(logger);
app.use(express.urlencoded({ extended: true }));  // For encoding of req.body

// Session middleware
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 300000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;