import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  PreloadingStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Dans le path, il ne faut pas mettre le /
  { path: 'legal', component: LegalComponent },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), // Preloading permet de faire du chargement masqués
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
