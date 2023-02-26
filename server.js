const express = require("express");
const session = require("express-session");

const Questionss = require("./models/question");
const Users = require("./models/user");
const Answer = require("./models/answer");
const Result = require("./models/result");

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/assets", express.static("public"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "12345ihn45874kkkk6m",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, expires: new Date("2023-12-31") },
  })
);

app.use(require("./middlewares/user"));
app.use(require("./middlewares/flash"));
app.use(require("./middlewares/avancement"));

app.get("/", (req, res) => {
  res.render("pages/index", { t: req.body.contento });
});

app.post("/", (req, res) => {
  if (req.body.contento === undefined || req.body.contento === "") {

  } else {
    req.session.username = req.body.contento;
  }
  res.redirect("/questions");
});

app.get("/questions", (req, res) => {
  res.render("pages/questions", { l: req.body.categorie });
});

app.post("/questions", (req, res) => {
  req.session.score = 0;
  if (req.body.categorie === undefined || req.body.categorie === "") {
    req.flash("error", "veuillez choisir une catégorie");
    res.redirect("/questions");
  } else {
    let p = null;
    if (req.body.categorie !== undefined) {
      if (Array.isArray(req.body.categorie)) {
        req.flash("error", "veuillez choisir une seule catégorie !");
        res.redirect("/questions");
      } else {
        p = req.body.categorie;
      }
    }
    let rep;
    let temp = [];
    Questionss.create(p, (result) => {
      req.session.tabloblo = result.map((question) => question._id);
      req.session.nombredeQ = req.session.tabloblo.length;
      req.session.questions = result.map((question) => question._content);
      res.redirect("/next");
    });
  }
});

app.get("/next", (req, res) => {
  if (req.session.tabloblo.length > 0) {
    let koko = req.session.tabloblo[0];
    let kekestion = req.session.questions[0].split(",")[0];
    Answer.create(koko, (resultt) => {
      let questions = req.session.questions;
      res.render("pages/quizz", {
        questions: kekestion,
        answers: resultt,
        score: req.session.score,
      });
    });
  } else {
    const score = req.session.score;
    const userId = req.session.username;
    Result.create(userId, score, (err, result) => {
      if (err) {
      }
      res.render("pages/quizzEnd", {
        score: req.session.score,
        total: req.session.nombredeQ,
      });
    });
  }
});

app.post("/next", (req, res) => {
  const selectedAnswer = req.body.answers;
  if (selectedAnswer === "1") {
    req.session.score += 1;
  }
  req.session.tabloblo.shift();
  req.session.questions.shift();
  res.redirect("/next");
});

app.get("/rejouer", (req, res) => {
  res.redirect("/");
});


app.get("/*", (req, res) => {
  res.send("ceci est une route non déclarée");
});

app.listen(8081);
