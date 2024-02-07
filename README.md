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



install ==> npm i express colors dotenv morgan nodemon mongoose



1. now start or connect to the express server
so firsr create server.js file and write that code

import express from "express";
import colors from "colors";
import dotenv from "dotenv"

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

// configure database

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




5.

