import "dotenv/config";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

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

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use("/api", appRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
