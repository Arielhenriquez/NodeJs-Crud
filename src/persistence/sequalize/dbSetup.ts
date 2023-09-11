import User from "../entities/User";
import { connectToDatabase } from "./dbConfig";

export const dbSetup = async () => {
  await connectToDatabase();
  await User.sync({ force: true });
  console.log("Tables have been created.");
};
