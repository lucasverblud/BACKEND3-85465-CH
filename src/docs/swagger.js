import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API - Backend 3 (Entrega Final)",
      version: "1.0.0",
      description: "Documentación completa de los módulos: Users y Adoptions",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor local",
      },
    ],
  },
  // 👇 acá incluimos TODOS los YAML
  apis: [
    "./src/docs/users.yaml",
    "./src/docs/adoptions.yaml"
  ],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
