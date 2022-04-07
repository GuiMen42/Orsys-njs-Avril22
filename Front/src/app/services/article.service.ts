import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articles: Article[] = [
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
    { name: 'Pince', price: 3.52, qty: 234 },
  ];
  public urlApi: string = 'api/';
  public urlArticles: string = 'articles';
  public urlServer: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    this.retrieveAll();
  }

  async add(article: Article) {
    try {
      await lastValueFrom(
        this.http.post<void>(
          this.urlServer + this.urlApi + this.urlArticles,
          article
        )
      );
    } catch (err) {
      console.log('err: ', err);
      throw err;
    }
  }

  retrieveAll() {
    this.http
      .get<Article[]>(this.urlServer + this.urlApi + this.urlArticles)
      .subscribe({
        next: (articles) => {
          this.articles = articles;
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('Fin de récupération des artciles');
        },
      });
  }
}
