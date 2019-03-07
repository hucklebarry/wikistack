const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const layout = require("../views/layout");
const mainPage = require("../views/main");
const wikipage = require("../views/wikipage");
const { Page } = require("../models");
const { User } = require("../models");
// function slugify(str) {
//   return str.replace(/\s+/g, "_").replace(/\W/g, "");
// }

router.get("/", async (req, res, next) => {
    const allPages = await Page.findAll()
    console.log(allPages)
  res.send(mainPage(allPages));
});

router.post("/", async (req, res, next) => {
  // res.json(req.body);
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  const [user, wasCreated] = await User.findOrCreate({where: {name: req.body.author,
email: req.body.email}});
page.setAuthor(user)

  console.log(page);
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.send(wikipage(page));
    } catch (error) {next(error)}
    // res.send(`hit dynamic route at ${req.params.slug}`);
  });

module.exports = router;
