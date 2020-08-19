const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const postRoute = require("./routes/posts");
env.config();

// connect to DB
mongoose.connect(
  process.env.DB_NAME,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to mongo")
);
// middleware
app.use(express.json());
// for JWT authentication
// route middlewares
app.use("/api/user", auth);
app.use("/api/inventory", postRoute);

//
// listen to port
app.listen(3000, () => console.log("Server is up and running"));

// mongodb://localhost:27017/InventoryApp
