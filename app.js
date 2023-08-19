"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
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
app.get("/", (req, res) => {
  res.send("oli wold desde nodo.js");
});
app.post("/otraruta", (req, res) => {
  res.send(olaJson);
});
app
  .route("/book")
  .get((req, res) => {
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
app.use(
  "/swagger",
  swagger_ui_express_1.default.serve,
  swagger_ui_express_1.default.setup(swaggerDocument)
);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
