import express, { Express, Request, Response } from "express";
import { bookRoutes } from "./src/routes/book.routes";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");

import { connectToDatabase } from "./src/persistence/dbconfig";
//dist\app.js
const app: Express = express();
app.use(express.json());
app.use(bookRoutes);
const port = 3000;

const olaJson = {
  nombre: "ola",
  edad: 10,
};

//Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("oli wold desde nodo.js");
});

app.post("/otraruta", (req: Request, res: Response) => {
  res.send(olaJson);
});

app.route("/test-connection").get(async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    res.status(200).send("Connected to database successfully!");
  } catch (error) {
    res.status(500).send("Unable to connect to the database.");
  }
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/swagger/`);
});
