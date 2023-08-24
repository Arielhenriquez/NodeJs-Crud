import { Express } from "express";
import swaggerDocument from "../swagger/swagger.json";
import swaggerUi from "swagger-ui-express";

const setupSwagger = (app: Express) => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
