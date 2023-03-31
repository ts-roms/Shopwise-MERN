const app = require("./app");
const connectDatabase = require("./db/database");

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting the server for uncaught exception");
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// connect db
connectDatabase();

// connect server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
