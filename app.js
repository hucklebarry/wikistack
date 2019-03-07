const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const models = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

models.db.authenticate().then(() => {
  console.log("connected to the database");
});

const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use("/wiki", wikiRouter);
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

app.get("/", (req, res, next) => {
  res.send(layout(""));
});

const PORT = 3000;

const init = async () => {
  await models.User.sync({force: true});
  await models.Page.sync({force: true});

  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}!`);
  });
};

init();

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
