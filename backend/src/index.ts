import "dotenv/config";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
// import subscriptionsController from "./controllers/subscriptions"
import webpush from 'web-push'
import todosRoute from "./routes/todosRoute";
import authRoute from "./routes/authRoute";
import cookieParser from 'cookie-parser'

mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => {
        console.log("Connected to MongoDb");
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

webpush.setVapidDetails(
    "mailto:moheykaramdev@gmail.com",
    process.env.PUBLIC_VAPID_KEY as string,
    process.env.PRIVATE_VAPID_KEY as string
)

const app: Application = express();
const port = process.env.PORT || 6969;

app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(bodyParser.json());

app.use("/todos", todosRoute);
app.use("/auth", authRoute);

app.listen(port, () => console.log("Server is running on port ", port));
