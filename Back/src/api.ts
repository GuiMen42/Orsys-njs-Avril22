import { json, Router } from "express"; // {} permet de récupérer directement un object de la bibliothèque
import { Article } from "./interfaces/article";
import morgan, { Morgan } from "morgan";
import { v4 as uuidv4 } from "uuid";

const app = Router();

const articles: Article[] = [
  { name: "Tondeuse", price: 120, qty: 9 },
  { name: "Marteau", price: 20, qty: 250 },
  { name: "autres articles", price: 20, qty: 250 },
];

// Middleware
// Regarde l'entête, si content-type = application/json alors lecture du body et mise du json dans la partie body de la requete recu
app.use(json());

app.use(morgan("combined"));

// Middleware de crash du serveur
app.get("/crash", (req, res, next) => {
  (async () => {
    throw new Error("Oups... Server crashed...");
  })();
});

app.get("/date", (req, res, next) => {
  res.json({
    date: new Date(),
  });
});

app.get("/articles", (req, res) => {
  (async () => {
    try {
      res.json(articles);
    } catch (err) {
      console.log("err: ", err);
    }
  })();
});

app.post("/articles", (req, res) => {
  (async () => {
    try {
      const article: Article = req.body;
      console.log("article: ", article);
      article.id = uuidv4();
      articles.push(article);
      res.status(201).json(article);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.delete("/articles", (req, res) => {
  console.log("delete");
});

export const export_api = app; // Nom de l'objet dans les autres files
