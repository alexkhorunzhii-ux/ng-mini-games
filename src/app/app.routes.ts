import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'blitz',
    pathMatch: 'full',
  },
  {
    path: 'blitz',
    loadChildren: () =>
      import('./features/blitz/blitz.routes').then((m) => m.BLITZ_ROUTES),
  },
];
