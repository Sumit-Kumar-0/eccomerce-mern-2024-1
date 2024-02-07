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
