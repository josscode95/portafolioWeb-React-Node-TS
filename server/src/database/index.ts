import mongoose from "mongoose";
import keys from '../keys';

const dbConnection = async() => {
  try {
    await mongoose.connect(keys.DB);
    console.log("Base de datos online");
  } catch (error) {
    console.log("Catch en dbConnection", error)
    throw new Error("Error a la hora de iniciar la BD")
  }
}

export default dbConnection;