import bcrypt from "bcrypt";
import colors from "colors";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(`error while hashing the pasword ${error}`);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const comparedPassword = bcrypt.compare(password, hashedPassword);
    return comparedPassword;
  } catch (error) {
    console.log(`error while comparing the password ${error}`);
  }
};
