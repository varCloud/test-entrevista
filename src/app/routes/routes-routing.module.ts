import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes.component';
import { ComputadorasComponent } from './pages/computadoras/computadoras.component';
import { NewComponent } from './pages/new/new.component';
import { ContactComponent } from './pages/contact/contact.component';
import { hasPermissionGuard } from '../guards/has-permission.guard';

const routes: Routes = [{
  path:'', 
  component:RoutesComponent,
   children:[{
     path:'',
     loadChildren: () =>
      import('./pages/home/home.module'
      ).then((m) => m.HomeModule),
   },
   {
    canMatch:[hasPermissionGuard],
    path:'computadoras',
    component:ComputadorasComponent
  },
  {
    canMatch:[hasPermissionGuard],
    path:'new',
    component:NewComponent
  },
  {
    canMatch:[hasPermissionGuard],
    path:'edit/:id',
    component:NewComponent
  },
  {
    canMatch:[hasPermissionGuard],
    path:'contact',
    component:ContactComponent
  }
  ]
}]

;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
