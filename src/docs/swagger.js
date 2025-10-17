// src/docs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API - Users Module",
      version: "1.0.0",
      description: "Documentación del módulo Users (Entrega Final - Backend 3)",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/docs/users.yaml"], // Archivo donde estarán las rutas documentadas
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
