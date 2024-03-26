import { User } from "../entities/User";
import { connectToDatabase } from "./dbConfig";

const dbSetup = async () => {
  try {
    await connectToDatabase();
    await User.sync({ force: false });
    console.log("Tables have been created.");
  } catch (error) {
    console.error("Database setup failed:", error);
  }
};

export default dbSetup;
