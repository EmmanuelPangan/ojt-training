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
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'home', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'place', component: PlaceComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] }
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
