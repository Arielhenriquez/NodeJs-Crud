import { Dialect, Sequelize } from "sequelize";
require('dotenv').config();

const dbConfig = new Sequelize(process.env.DATABASE_NAME as string, process.env.DATABASE_USERNAME as string, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_TYPE as Dialect,
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
