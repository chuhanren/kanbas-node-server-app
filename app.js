import "dotenv/config";
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

const app = express();
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

app.use(
  cors({
    credentials: true,
    origin: "https://a6--glittering-youtiao-f3b141.netlify.app",
    // origin: "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);

Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000);
