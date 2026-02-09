import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { PlaceComponent } from './place/place.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from './header/header.component'; 
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { GuestGuard } from './guest.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddTaskComponent } from './order/add-task/add-task.component';
import { EditTaskComponent } from './order/edit-task/edit-task.component';
import { DeleteTaskComponent } from './order/delete-task/delete-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'home', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'place', component: PlaceComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard],
      children: [
                  {path: 'add', component: AddTaskComponent},
                  {path: 'edit', component: EditTaskComponent},
                  {path: 'delete', component: DeleteTaskComponent}
                ]
   },

  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:
  [
    RouterModule
  ]
})
export class AppRoutingModule { }
