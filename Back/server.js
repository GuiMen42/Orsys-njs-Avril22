console.log("About to start the server");

const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = 3000;

// Tous les types de requetes
app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

// envoie d'une réponse sur une requête get
// Ajout * dans le path pour prendre en compte toute les requetes
app.get("/*", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
