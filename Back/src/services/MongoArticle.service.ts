import { Article } from "../interfaces/article";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { MongoClient, Db, Document, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017/gestion-stock";

let db: Db;

const init = async () => {
  try {
    const dbClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await dbClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");
    db = dbClient.db();
  } catch (err) {
    console.log("err: ", err);
    process.exit(1);
  }
};

// Fonction appelé une seule fois et au premier import de la bibliothèque
init();

const convert = (doc: Document) => {
  const result = { ...doc };
  result.id = result._id.toHexString();
  delete result._id;
  return result;
};

export class MongoArticleService {
  async add(article: Article): Promise<Article> {
    const result = await db.collection("articles").insertOne(article);
    const addedArticle = { ...article };
    addedArticle.id = result.insertedId.toHexString();
    console.log("addedArticle: ", addedArticle);
    return article;
  }

  async remove(ids: string[]) {
    const objects = ids.map((id) => new ObjectId(id));
    console.log("objects: ", objects);

    await db.collection("articles").deleteMany({ _id: { $in: objects } });
  }

  async retrieveAll() {
    const documents = await db.collection("articles").find({}).toArray();
    const articles = documents.map((doc) => convert(doc));
    return articles;
  }
}
