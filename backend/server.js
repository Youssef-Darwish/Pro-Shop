const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const log4js = require("log4js");
const logger = log4js.getLogger("Server.js");

log4js.configure({
  appenders: {
    console: { type: "console" },
    file: { type: "fileSync", filename: "logs/server_logs.log" },
  },
  categories: {
    default: { appenders: ["file", "console"], level: "DEBUG" },
  },
});

dotenv.config();
connectDB();
const server = express();

if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
}

server.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
server.use(bodyParser.json()); // Send JSON responses

// app.use(express.json());

server.get("/", (req, res) => {
  res.send("API is running");
});

server.use("/api/products", productRoutes);
server.use("/api/users", userRoutes);
server.use("/api/orders", orderRoutes);
server.use("/api/upload", uploadRoutes);

// make uploads folder static to be accessible
server.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Not found and error handler middlewares
server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(
  PORT,
  logger.debug(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

module.exports = server;
