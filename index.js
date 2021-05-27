const express = require("express");
const app = express();
const connection = require("./database/database");

// Models
const Question = require("./database/models/Question");
const Response = require("./database/models/Response");
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
  Question.findAll({ raw: true, order:[['id', 'DESC']] }).then((questions) => {
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

app.get("/question/:id", (req, res) => {
  const id = req.params.id;

  Question.findOne({
    where: {
      id: id
    }
  }).then((question) => {
    if(question != undefined) {
      res.render("question", {
        question: question
      });
    } else {
      res.redirect("/");
    }
  });
});

const port = 8000;

app.listen(port, () => console.log("Server is running!"));