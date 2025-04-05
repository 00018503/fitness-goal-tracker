const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { body, validationResult } = require("express-validator");
const path = require("path");
const Goal = require("./models/goal");
const goalsRouter = require("./routes/goals");

const app = express();

// // mongodb connection
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fitness-goals",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// routes
app.use("/goals", goalsRouter);

// to redirect homepage to the goals route
app.get("/", (req, res) => {
  res.redirect("/goals");
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
