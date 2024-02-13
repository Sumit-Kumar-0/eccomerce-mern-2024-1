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
        success: false,
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

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
      token
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

    res.status(200).send({
      success: "true",
      message: `${user.name}, You are login successfully!`,
      user: {
        user: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      }
    });
  } catch (error) {
    console.log("error in login", error);
  }
};
