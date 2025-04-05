const express = require("express");
const { body, validationResult } = require("express-validator");
const Goal = require("../models/goal");

const router = express.Router();

// validation
const goalValidation = [
  body("type").notEmpty().withMessage("Type is required"),
  body("target").isNumeric().withMessage("Target must be a number"),
  body("progress").isNumeric().withMessage("Progress must be a number"),
  body("deadline")
    .isISO8601()
    .toDate()
    .withMessage("Deadline must be a valid date"),
];

// read goal
router.get("/", async (req, res) => {
  const goals = await Goal.find();
  res.render("goals/index", { goals });
});

// create goal
router.get("/new", (req, res) => {
  res.render("goals/new", { goal: {} });
});

router.post("/", goalValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("goals/new", { goal: req.body, errors: errors.array() });
  }
  const goal = new Goal(req.body);
  await goal.save();
  res.redirect("/goals");
});

// read goal by details
router.get("/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).send("Goal not found");
    res.render("goals/show", { goal });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// update goal
router.get("/:id/edit", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).send("Goal not found");
    res.render("goals/edit", { goal });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.put("/:id", goalValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("goals/edit", { goal: req.body, errors: errors.array() });
  }
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!goal) return res.status(404).send("Goal not found");
    res.redirect(`/goals/${goal._id}`);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// delete goal
router.delete("/:id", async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).send("Goal not found");
    res.redirect("/goals");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
