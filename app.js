const express = require("express");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).send("Database connection error");
  }
});

app.get("/", (req, res) => {
  res.redirect("/orders");
});

app.use("/", orderRoutes);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
