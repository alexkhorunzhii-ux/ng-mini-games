import { Routes } from '@angular/router';

export const BLITZ_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blitz.component').then((m) => m.BlitzComponent),
  },
];
