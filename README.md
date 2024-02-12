npm init



git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin <github repo url>
git push -u origin main



.gitignore ==>
node_modules
.env
package-lock.json



install ==> npm i express colors dotenv morgan nodemon mongoose bcrypt



1. now start or connect to the express server
so firsr create server.js file and write that code

import express from "express";
import colors from "colors";
import dotenv from "dotenv";

// configure env 
// dotenv.config({path: ''})  // give path if your .env file not in root folder
dotenv.config() // use this for root folder

// rest object 
const app = express();

// rest api
app.get("/", (req, res) => {
  res.json({ messege: "hello world node" });
});

//port
let PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`.bgBlack.blue);
});




2. now make connection to mongo db database like first create a database on mongo site and get connection url then make a file------ config/db.js then write that code

import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connected to ${connection.connection.host} host`.bgBlue.white
    );
    return connection; // Return the connection object if successful
  } catch (error) {
    console.log(`Database connection error: ${error}`.bgRed.white);
    throw error; // Throw the error if unsuccessful
  }
};

export default connectDB;





3. now import this connectDB in server.js and also import morgan and call it and also use middleware app.use(express.json())

import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

// configure env
// dotenv.config({path: ''})  // give path if your .env file not in root folder
dotenv.config(); // use this for root folder

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// rest api
app.get("/", (req, res) => {
  res.json({ messege: "hello first application" });
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




4. now create folders according to MVC (model view controller) pattern 

controllers
helpers
middelwares
models
routes




5. now make userScema and create userModel in models/userModel.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;




6. now we will make routes for authcontroller so first route will be register with post method here we need to made router object which is property of express so here is the code...
routes/authRoute.js 

import express from "express";
import {registerController} from "../controllers/authController.js"

// router object 
const router = express.Router();

// routes
// ragister // method post
router.post("/register", registerController);

export default router;

====>>>   here we are using registerController so we made this seprately in 
file controllers/authController.js ==> function name registerController

export const registerController = (req, res) => {};

=====>>>  now we will import authRoute.js in server.js and make rotes b/w middlewares and rest api
server.js

import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import {authRoute} from "./routes/authRoute.js"

// configure env
// dotenv.config({path: ''})  // give path if your .env file not in root folder
dotenv.config(); // use this for root folder

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute)

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




7. now going to do password hash and compare by  using bcrypt library so create file and make two function for hash password and compare password ---
helpers/authHelper.js 

import bcrypt from "bcrypt";
import colors from "colors";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(`error while hashing the password ${error}`.bgRed.white);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword;
  } catch (error) {
    console.log(`error while comparing the password ${error}`);
  }
};




8. now going to write registerController function with validation and error handling
controllers/registerController.js

import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ message: "name is required!" });
    }
    if (!email) {
      return res.send({ message: "email is required!" });
    }
    if (!password) {
      return res.send({ message: "password is required!" });
    }
    if (!phone) {
      return res.send({ message: "phone is required!" });
    }
    if (!address) {
      return res.send({ message: "address is required!" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "user is already register with this email please login!",
      });
    }

    // save new user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in user registration",
      error
    });
  }
};




9. now create the login route for user and admin and it's controller function also implement the JWT in it to protect the routing

9a. controllers/authController.js

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // validation
    if (!name) {
      return res.send({ message: "name is required!" });
    }
    if (!email) {
      return res.send({ message: "email is required!" });
    }
    if (!password) {
      return res.send({ message: "password is required!" });
    }
    if (!phone) {
      return res.send({ message: "phone is required!" });
    }
    if (!address) {
      return res.send({ message: "address is required!" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "user is already register with this email please login!",
      });
    }

    // save new user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in user registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.send({ message: "email or password is invalid!" });
    }

    // check user
    const user = await userModel.findOne({ email });

    // existing user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not registered! please sign in first!!",
      });
    }

    const matchPassword = await comparePassword(password, user.password);

    if (!matchPassword) {
      return res.status(404).send({
        success: false,
        message: "password is invalid",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: "true",
      message: `${user.name}, You are login successfully!`,
      user: {
        user: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.log("error in login", error);
  }
};

9b. middlewares/authMiddleware.js

import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// login middleware base on token
export const requireLogin = async (req, res, next) => {
  try {
    const decodeUser = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.userId = await decodeUser._id;
    next();
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "error while decoding login token",
      error,
    });
  }
};

// check, is user admin base on role

export const isAdmin = async (req, res, next) => {
  try {
    // get user by id
    const user = await userModel.findById(req.userId);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access!! you are not admin",
        user,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "error while try to login as admin",
      error,
    });
  }
};

9c. routes/authRoutes.js

import express from "express";
import {loginController, registerController} from "../controllers/authController.js"
import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";

// router object 
const router = express.Router();

// routes
// ragister // method post
router.post("/register", registerController);

// login // method post
router.post("/login",requireLogin, loginController);

// login admin // method post
router.post("/login/admin",requireLogin, isAdmin, loginController);

export default router;
