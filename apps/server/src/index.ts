import "dotenv/config";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import "./db/index";
import { openApiSpec } from "./docs/openapi";
import { appRouter } from "./routers";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "",
        methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/docs.json", (_req, res) => {
    res.status(200).json(openApiSpec);
});

const swaggerHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Argumento API Docs</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js"></script>
    <script>
      const ui = SwaggerUIBundle({
        url: "/api/docs.json",
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        requestInterceptor: (request) => {
          request.headers['Access-Control-Allow-Origin'] = '*';
          return request;
        }
      })
      window.ui = ui
    </script>
  </body>
</html>`;

app.get("/api/docs", (_req, res) => {
    res.set("Content-Type", "text/html");
    res.send(swaggerHtml);
});

app.use("/api", appRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
