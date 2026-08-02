const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 30001;
const MONGO_URI =
  process.env.MONGO_URI ;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB ho gya he");

    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection failed:", error);
  });