require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//
const express = require("express");
const app = express();

// Connect DB
const connectDB = require("./db/connect");

// Import authentication middleware
const authenticateUser = require("./middleware/authentication");

// Import Router
const authRouter = require("./routes/auth");
const itemsRouter = require("./routes/items");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//////////////////////////////////////////////////////////////
// Middlewares
app.use(express.json());

// applying security libs
app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

app.use(helmet());
app.use(cors());
app.use(xss());

//
// app.get("/", (req, res) => {
//     res.send("Jobs API");
// });

app.use(express.static("public"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", authenticateUser, itemsRouter);

//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//////////////////////////////////////////////////////////////
// Server
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
