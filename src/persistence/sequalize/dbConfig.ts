import { Sequelize } from "sequelize";

const dbConfig = new Sequelize("waldodb", "postgres", "waldodb", {
  host: "localhost",
  dialect: "postgres",
});

export const connectToDatabase = async () => {
  try {
    await dbConfig.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default dbConfig;
