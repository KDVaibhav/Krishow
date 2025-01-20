import express from 'express';
import v1Router from "./routes/v1/index.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1", v1Router);
app.listen(process.env.PORT || 8080);