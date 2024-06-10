import express, { Express, Request, Response } from "express";
import { bookRoutes } from "./src/routes/book.routes";
import { connectToDatabase } from "./src/persistence/sequalize/dbConfig";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import dbSetup from "./src/persistence/sequalize/dbSetup";
import { userRoutes } from "./src/routes/user.routes";
import passport from "./src/services/passportConfig"; 

const app: Express = express();
app.use(express.json());
app.use(passport.initialize());
app.use("/api/",bookRoutes);
app.use("/api/",userRoutes);
const port = 3000;

const olaJson = {
  nombre: "ola",
  edad: 10,
};

dbSetup();

//Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("oli wold desde nodo.js");
});

app.post("/otraruta", (req: Request, res: Response) => {
  res.send(olaJson);
});

app.route("/test-connection").get((req: Request, res: Response) => {
  connectToDatabase()
    .then(() => {
      res.status(200).send("Connected to database successfully!");
    })
    .catch((error) => {
      res.status(500).send("Unable to connect to the database.");
    });
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/swagger/`);
});
