import { Article } from "../interfaces/article";
import { v4 as uuidv4 } from "uuid";

let articles: Article[] = [
  { id: "1", name: "Tondeuse", price: 120, qty: 9 },
  { id: "2", name: "Marteau", price: 20, qty: 250 },
  { id: "3", name: "autres articles", price: 20, qty: 250 },
];

export class FileArticleService {
  async retrieveAll() {
    return articles;
  }

  async add(article: Article): Promise<Article> {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles.push(addedArticle);
    return addedArticle;
  }

  async remove(ids: string[]) {
    articles = articles.filter((a) => !ids.includes(a.id));
  }
}
