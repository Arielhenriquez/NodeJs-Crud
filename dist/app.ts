import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";

import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.json());
const port = 3000;

const olaJson = {
  nombre: "ola",
  edad: 10,
};

const data = [
  {
    id: 0,
    name: "book",
    author: "ola",
  },
];

//Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("oli wold desde nodo.js");
});

app.post("/otraruta", (req: Request, res: Response) => {
  res.send(olaJson);
});

app
  .route("/book")
  .get((req: Request, res: Response) => {
    res.send(data);
  })
  .post((req, res) => {
    const body = req.body;
    const idExists = data.some((book) => book.id === body.id);
    if (idExists) {
      res.status(409).send(`book with id: ${body.id} already exists`);
    } else {
      data.push(body);
      res.status(201).send(body);
    }
  })
  .put((req, res) => {
    res.send("Update the book");
  });

app.route("/book/:id").get((req, res) => {
  const bookParams = parseInt(req.params.id);
  const findBookById = data.find((book) => book.id === bookParams);

  if (findBookById) {
    res.send(findBookById);
  } else {
    res.status(404).send(`Book with id: ${bookParams} not found`);
  }
});

app.get("/logger", (req, res) => {
  res.send("Hello World!");
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
