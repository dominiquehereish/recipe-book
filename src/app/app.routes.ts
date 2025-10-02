import { Routes } from '@angular/router';
import { Home } from './core/home/home';
// import { authGuard } from './core/guards/auth.guard'; // ✅

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
    path: '**',
    redirectTo: '',
  },
];
