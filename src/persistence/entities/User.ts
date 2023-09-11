import { DataTypes } from "sequelize";
import dbConfig from "../sequalize/dbConfig";

console.log("DBconfig: " + dbConfig);
const User = dbConfig.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green",
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

export default User;
