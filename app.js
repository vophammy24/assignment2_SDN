const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/orders");
});

app.use("/", orderRoutes);

app.use((req, res) => {
  res.status(404).send("Page not found");
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});