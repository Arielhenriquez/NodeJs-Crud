import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("waldodb", "postgres", "waldodb", {
  host: "localhost",
  dialect: "postgres",
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  }
}

export { connectToDatabase, sequelize };
