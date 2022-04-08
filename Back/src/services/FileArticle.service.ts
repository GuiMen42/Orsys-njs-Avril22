import { Article } from "../interfaces/article";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

let articles: Article[] = [];

const JSON_FILE = "data/articles.json";
const init = () => {
  try {
    const str = fs.readFileSync(JSON_FILE, { encoding: "utf-8" });
    articles = JSON.parse(str);
  } catch (err) {
    console.log("err: ", err);
    articles = [
      { id: "1", name: "Tondeuse", price: 120, qty: 9 },
      { id: "2", name: "Marteau", price: 20, qty: 250 },
      { id: "3", name: "autres articles", price: 20, qty: 250 },
    ];
  }
};

// Fonction appelé une seule fois et au premier import de la bibliothèque
init();

const save = async () => {
  fs.promises.writeFile(JSON_FILE, JSON.stringify(articles));
};

export class FileArticleService {
  async add(article: Article): Promise<Article> {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles.push(addedArticle);
    await save();
    return addedArticle;
  }

  async remove(ids: string[]) {
    articles = articles.filter((a) => !ids.includes(a.id));
    await save();
  }

  async retrieveAll() {
    return articles;
  }
}
