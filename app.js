const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { body, validationResult } = require("express-validator");
const path = require("path");
const Goal = require("./models/goal");
const goalsRouter = require("./routes/goals");

const app = express();

// mongodb atlas connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://shoafzal:shoafzal17@cluster0.0uvyh.mongodb.net/fitness-goals?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// route
app.use("/goals", goalsRouter);

// redirects to goals route
app.get("/", (req, res) => {
  res.redirect("/goals");
});

// server start
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
