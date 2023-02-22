let express = require("express");
//let db = require('./config/database');
let session = require("express-session");
let Game = require("./models/Game");
// lance le serv
let app = express();

app.set("view engine", "ejs");

// permet de 'décoder' les données de requêtes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// rend le dossier styles public
app.use("/assets", express.static("public"));
// pour la session
app.set("trust proxy", 1);
app.use(
  session({
    secret: "12345ihn45874kkkk6m", //clé unique
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, expires: new Date("2023-12-31") }, // false si http , true si https
  })
);

///// middleware /////
app.use(require("./middlewares/user"));
app.use(require("./middlewares/flash"));
//routes
app.get("/", (req, res) => {
  console.log(req.session);
  res.render("pages/index", {
    date1: "ceci est le data de test",
    elements: false,
  });
});

app.get("/date", (req, res) => {
  res.render("pages/index", {
    date2: `${new Date().toLocaleDateString()}`,
  });
});

app.get("/date/:x", (req, res) => {
  let date = new Date();
  date.setDate(date.getDate() + req.params.x);
  let dateString = date.toLocaleDateString();

  res.render("pages/index", {
    dateAuj: `${new Date().toLocaleDateString()}`,
    leParam: req.params.x,
    date1: dateString,
  });
});

app.get("/form", (req, res) => {
  console.log(req.session);
  res.render("pages/form");
});

app.post("/form", (req, res) => {
  console.log(req.body);
  res.render("pages/form", { t: req.body.content });
});

app.post("/date", (req, res) => {
  let x = req.body.content;
  res.redirect("/date/" + x);
});

app.get("/games", (req, res) => {
  console.log(req.session);
  //     // recherche les données
  // db.query('SELECT * FROM videogames ORDER BY name',
  //  (err, result) => {
  //     console.log(result)
  // res.render('pages/listing', {posts : result})
  // })
  Game.all((retour) => {
    res.render("pages/listing", { posts: retour });
  });

  //     //affiche une vue avec les données en param
});
app.post("/addgame", (req, res) => {
  if (req.body.name === undefined || req.body.name === "") {
    console.log("name vide");
    req.flash("error", "nom de jeu invalide");
    res.redirect("/games");
  } else {
    let p = null;
    if (req.body.platforms !== undefined) {
      if (Array.isArray(req.body.platforms)) {
        p = req.body.platforms.join(",");
      } else {
        p = req.body.platforms;
      }
    }

    Game.create(req.body.name, p, req.session.username, () => {
      console.log("ok");
      res.redirect("/games");
    });
  }
});

app.get("/randomusername", (req, res) => {
  req.flash("succès", "félicitations vous avez un nouveau nom");
  req.session.username = "u-" + Math.floor(Math.random() * 100000);
  res.redirect("/");
});

app.get("/inscription", (req, res) => {
  res.render("pages/inscription");
});

app.post("/inscription", (req, res) => {
  if (req.body.contento === undefined || req.body.contento === "") {
    //
  } else {
    req.session.username = req.body.contento;
  }
  res.redirect("/");
});

app.get("/*", (req, res) => {
  res.send("ceci est une route non déclarée");
});

app.listen(8081);
