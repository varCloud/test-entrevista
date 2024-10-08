import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { hasPermissionGuard } from './guards/has-permission.guard';
import { hasLoggedGuard } from './guards/has-logged.guard';

const routes: Routes = [
  {
    path: 'routes',
    canActivate: [authGuard],
    //canMatch:[hasPermissionGuard],
    loadChildren: () =>
      import('./routes/routes.module').then((m) => m.RoutesModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login',
    //canActivate: [hasLoggedGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
