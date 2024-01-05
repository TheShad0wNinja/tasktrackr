import "dotenv/config";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import todosController from "./controllers/todos";

mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => {
        console.log("Connected to MongoDb");
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const app: Application = express();
const port = process.env.PORT || 6969;

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(bodyParser.json());

app.use("/todos", todosController);

app.listen(port, () => console.log("Server is running on port ", port));
