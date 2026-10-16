import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { ConsultActivite } from './consult-activite/consult-activite';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'index.html', component: Home },
  { path: 'about', component: About },
  { path: 'consultAct/:id/:param2', component: ConsultActivite },
  { path: 'consultAct/:id', component: ConsultActivite },
  { path: 'consultAct', component: ConsultActivite },
];
