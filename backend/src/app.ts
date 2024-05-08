import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import usersRoutes from "./routes/userRoute";
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { checkUser } from "./middleware/checkUser";

const app = express();

//just gives info in console about requests made
app.use(morgan("dev"));

//just parses incoming requests with json
app.use(express.json());

//session
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

//router for users
app.use("/api/users", usersRoutes);
//router for notes
app.use("/api/notes", checkUser, notesRoutes);

//if an endpoint is not found
app.use((req,res,next) => {
    next(createHttpError(404, "Endpoint not found"));
});

//the error handler middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;