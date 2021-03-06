const express = require("express");
const app = express();
const connection = require("./database/database");

// Port
const port = 3000;

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
    where: { id: id }
  }).then((question) => {
    if(question != undefined) {
      Response.findAll({ 
        where: { 
          questionId: question.id 
        },
        order: [["createdAt", "DESC"]]
       }).then((responses) => {
         res.render("question", {
           question: question,
           responses: responses
         });
       });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/new-response", (req, res) => {
  const p = req.body;

  Response.create({
    body: p.body,
    questionId: p.questionId
  }).then(() => {
    res.redirect("/question/" + p.questionId);
  });
});

app.listen(port, () => console.log("Server is running!"));