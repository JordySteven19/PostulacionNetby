import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Prod1Component } from './paginas/MainProd/prod1/prod1.component';
import { Prod1form } from './paginas/MainProd/prod1form/prod1form';
import { Transc1 } from './paginas/MainTransc/transc1/transc1';
import { Transc1form } from './paginas/MainTransc/transc1form/transc1form';
import { TablasFiltro } from './paginas/tablas-filtro/tablas-filtro';


export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'tablas', component: TablasFiltro },
  { path: 'productos', component: Prod1Component },
  { path: 'productos/new', component: Prod1form },
  { path: 'productos/edit/:id', component: Prod1form },

  { path: 'transacciones', component: Transc1 },
  { path: 'transaccion/:id', component: Transc1form },
    { path: 'transacciones/edit/:id', component: Transc1form }
];

export const appRouterProviders = provideRouter(routes);