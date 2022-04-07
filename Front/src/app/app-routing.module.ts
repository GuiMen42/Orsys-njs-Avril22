import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, //dans le path, il ne faut pas mettre le /
  { path: 'legal', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
