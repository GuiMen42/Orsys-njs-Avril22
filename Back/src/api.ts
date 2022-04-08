import { json, Router } from "express"; // {} permet de récupérer directement un object de la bibliothèque
import { Article } from "./interfaces/article";
import morgan, { Morgan } from "morgan";
import { validation } from "./validation";

//import { RAMArticleService as ArticleService } from "./services/RAMArticle.service";
import { FileArticleService as ArticleService } from "./services/FileArticle.service";
//import { MongoArticleService as ArticleService } from "./services/MongoArticle.service";
import {
  ArticleCreateModel,
  ArticleDeleteModel,
} from "./validation/article.model";

const articlesService = new ArticleService();

const app = Router();

// Middleware
// Regarde l'entête, si content-type = application/json alors lecture du body et mise du json dans la partie body de la requete recu
app.use(json());

app.use(morgan("tiny"));

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
      const articles = await articlesService.retrieveAll();
      res.json(articles);
    } catch (err) {
      console.log("err: ", err);
    }
  })();
});

app.post("/articles", validation(ArticleCreateModel), (req, res) => {
  (async () => {
    try {
      const article: Article = req.body;
      console.log("article: ", article);
      const addedArticle = await articlesService.add(article);

      res.status(201).json(addedArticle);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.delete("/articles", validation(ArticleDeleteModel), (req, res) => {
  (async () => {
    try {
      const ids: string[] = req.body;
      console.log("ids: ", ids);
      await articlesService.remove(ids);
      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

export const export_api = app; // Nom de l'objet dans les autres files
