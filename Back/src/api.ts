import { Router } from "express"; // {} permet de récupérer directement un object de la bibliothèque

const app = Router();

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

export const export_api = app; // Nom de l'objet dans les autres files
