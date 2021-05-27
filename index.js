const express = require("express");
const app = express();
const connection = require("./database/database");

// Models
const Question = require("./database/models/Question");
//

connection
  .authenticate()
    .then(() => {
    console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    })

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  Question.findAll({ raw: true }).then((questions) => {
    res.render("index", {
      questions: questions
      });
  });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/new-question", (req, res) => {
  const p = req.body;

  Question.create({
    title: p.title,
    description: p.description
  }).then(() => {
    res.redirect("/");
  });
});

const port = 8000;

app.listen(port, () => console.log("Server is running!"));