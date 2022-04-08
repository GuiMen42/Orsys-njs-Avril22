import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  formulaire = new FormGroup({
    name: new FormControl('Default Name', [Validators.required]),
    price: new FormControl(10.25, [Validators.required]),
    qty: new FormControl(12, [Validators.required]),
  });

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  async submit() {
    console.log('submit');
    try {
      await this.articleService.add(this.formulaire.value as Article);
      await this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
    }
  }
}
