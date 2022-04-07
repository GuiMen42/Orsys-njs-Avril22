import { Router } from "express"; // {} permet de récupérer directement un object de la bibliothèque
import { Article } from "./interfaces/article";

const app = Router();

const articles: Article[] = [
  { name: "Tondeuse", price: 120, qty: 9 },
  { name: "Marteau", price: 20, qty: 250 },
  { name: "autres articles", price: 20, qty: 250 },
];

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
  res.json(articles);
});

export const export_api = app; // Nom de l'objet dans les autres files
