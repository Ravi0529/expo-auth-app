import express from "express";
import dotenv from "dotenv";
// import path from "path";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

const prisma = new PrismaClient();

dotenv.config({
    path: "./.env"
});

const app = express();
// const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:8081",
    "http://192.168.29.74:8081"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/v1/auth", authRoute);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/client/dist")));

//     app.get("*", (_, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//     });
// }

app.listen(PORT, () => {
    try {
        prisma.$connect();
        console.log(`Server is running on port ${PORT}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Internal Server Error", error);
    }
});
