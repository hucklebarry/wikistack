const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const layout = require("../views/layout");
const { Page } = require("../models");

// function slugify(str) {
//   return str.replace(/\s+/g, "_").replace(/\W/g, "");
// }

router.get("/", (req, res, next) => {
  res.send(layout(""));
});

router.post("/", async (req, res, next) => {
  // res.json(req.body);
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  console.log(page);
  try {
    await page.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
