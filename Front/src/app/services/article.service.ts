import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
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

  urlServer: string = 'http://localhost:3000/';
  urlApi: string = 'api/';
  urlArticles: string = 'articles';

  constructor(private http: HttpClient) {
    this.retrieveAll();
  }

  retrieveAll() {
    this.http.get(this.urlServer + this.urlApi + this.urlArticles);
  }
}