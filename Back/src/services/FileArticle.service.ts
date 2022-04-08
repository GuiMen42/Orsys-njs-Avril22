import { Article } from "../interfaces/article";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { BehaviorSubject, debounceTime } from "rxjs";

//let articles: Article[] = [];

// Régle de nommage $ à la fin pour dire que c'est un observable
const articles$ = new BehaviorSubject<Article[]>([]);

const JSON_FILE = "data/articles.json";
const init = () => {
  try {
    const str = fs.readFileSync(JSON_FILE, { encoding: "utf-8" });
    articles$.next(JSON.parse(str));
  } catch (err) {
    console.log("err: ", err);
    articles$.next([
      { id: "1", name: "Tondeuse", price: 120, qty: 9 },
      { id: "2", name: "Marteau", price: 20, qty: 250 },
      { id: "3", name: "autres articles", price: 20, qty: 250 },
    ]);
  }

  // pipe(debounceTime(2000)) // permet d'exécuter la fonction au bout de 2 secondes
  articles$.pipe(debounceTime(2000)).subscribe({
    next: (articles) => {
      fs.promises.writeFile(JSON_FILE, JSON.stringify(articles, null, 2)); // null, 2) mise en forme du fichietr json
    },
  });
};

// Fonction appelé une seule fois et au premier import de la bibliothèque
init();

export class FileArticleService {
  async add(article: Article): Promise<Article> {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles$.next([...articles$.value, addedArticle]);
    return addedArticle;
  }

  async remove(ids: string[]) {
    const remainingArticles = articles$.value.filter(
      (a) => !ids.includes(a.id)
    );
    articles$.next(remainingArticles);
  }

  async retrieveAll() {
    return articles$.value;
  }
}
