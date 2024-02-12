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
