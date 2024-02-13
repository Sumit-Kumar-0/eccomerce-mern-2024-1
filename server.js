import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// configure env
// dotenv.config({path: ''})  // give path if your .env file not in root folder
dotenv.config(); // use this for root folder

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);

// rest api
app.get("/", (req, res) => {
  res.json({ messege: "hello first application!!" });
});

//port
const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`.bgBlack.blue);
    });
  })
  .catch((error) => {
    console.log(`database not connected so port will not start ${error}`);
  });
