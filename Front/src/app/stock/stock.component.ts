import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  selectedItems = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.retrieveAll(); // Permet de rafraichier la liste des articles à chaque initialisation du composant (affichage de la page stock)
  }

  toggle(article: Article) {
    if (this.selectedItems.has(article)) {
      this.selectedItems.delete(article);
      return;
    }

    this.selectedItems.add(article);
  }

  remove() {
    (async () => {
      try {
        console.log('remove');
        await this.articleService.remove(this.selectedItems);
        this.selectedItems.clear();
      } catch (err) {
        console.log('err: ', err);
      }
    })();
  }
}
