const express = require("express");
const cors = require("cors");

const excursionRouter = require("./routes/excursionRouter");
const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");

const app = express();

// app.use(
//     cors({
//         origin: "http://localhost:5173/",
//     }),
// );

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "8mb" }));

app.use(express.json());

app.use("/api/v1/excursions", excursionRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
