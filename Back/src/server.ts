import express from "express";
import serveIndex from "serve-index";

console.log("About to start the server");

const app = express();
const port = +process.env.PORT || 3000;
const wwwDir = "./public"; // "." - Répertoire courant

// Tous les types de requetes
app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

// envoie d'une réponse sur une requête get
// Ajout * dans le path pour prendre en compte toute les requetes
// app.get("/*", (req, res) => {
//   res.send("Hello World!");
// });

// Middleware de crash du serveur
app.get("/api/crash", (req, res, next) => {
  (async () => {
    throw new Error("Oups... Server crashed...");
  })();
});

// Express.static permet de récupérer un fichier dans le répertoire wwwDir
app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
