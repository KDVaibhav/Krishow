import express, { NextFunction, Request, Response } from 'express';
import v1Router from "./routes/v1";
import config from './config';
const app = express();
app.use(express.json());
app.use("/api/v1", v1Router);
//if the user does not exist
app.use((req: Request, res: Response, next: NextFunction)=>{
    res.status(500).json({
        message: "Internal Server Error"
    })
})
app.listen(config.PORT || 8080);