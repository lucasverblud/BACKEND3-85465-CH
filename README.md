# Backend3 - Adoptions API

## Descripción

Proyecto de backend para la gestión de adopciones de mascotas, con usuarios y mascotas.
La API está completa con tests funcionales, documentación OpenAPI y Dockerización lista para producción.

## Imagen de Docker

La imagen está publicada en Dockerhub:

```bash
docker pull lucasverblud/backend3:latest
```

Link directo a Docker Hub:

```
https://hub.docker.com/r/lucasverblud/backend3
```

## Ejecutar el contenedor

```bash
docker run -p 8080:8080 lucasverblud/backend3:latest
```

* La API estará disponible en `http://localhost:8080`
* Puerto expuesto: `8080`

## Variables de entorno

Asegúrate de definir la conexión a MongoDB en el contenedor o en tu `.env`:

## Tests

Para correr los tests funcionales:

```bash
npm install
npm test
```

Los tests cubren todos los endpoints del router `adoption.router.js`:

* GET /api/adoptions → Listar todas las adopciones
* POST /api/adoptions/:uid/:pid → Crear adopción
* GET /api/adoptions/:id → Obtener adopción por ID
* PATCH /api/adoptions/:id → Actualizar adopción
* DELETE /api/adoptions/:id → Eliminar adopción

## Documentación OpenAPI / Swagger

La API está documentada en OpenAPI 3.0. El archivo de documentación se encuentra en `docs/adoptions.yaml`.

Ejemplo de visualización con Swagger UI:

```bash
npx swagger-ui-dist docs/adoptions.yaml
```

## Endpoints principales

#### Adoptions

* `GET /api/adoptions` → Obtener todas las adopciones
* `POST /api/adoptions/:uid/:pid` → Registrar una adopción
* `GET /api/adoptions/:id` → Obtener adopción por ID
* `PATCH /api/adoptions/:id` → Actualizar estado de la adopción (`pending` o `completed`)
* `DELETE /api/adoptions/:id` → Eliminar adopción

## Estructura del proyecto

```
src/
 ├─ app.js
 ├─ routes/
 │   └─ adoption.router.js
 ├─ dao/
 │   └─ models/
 │       ├─ user.model.js
 │       ├─ pet.model.js
 │       └─ adoption.model.js
 test/
 └─ adoptions.test.js
 Dockerfile
 package.json
 README.md
 docs/
 └─ adoptions.yaml
```