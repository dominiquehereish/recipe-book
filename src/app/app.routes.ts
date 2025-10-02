import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
    canActivate: [authGuard(['admin'])], // Only admin role allowed
  },
  {
    path: '**',
    redirectTo: '',
  },
];
