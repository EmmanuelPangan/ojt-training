import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { PlaceComponent } from './place/place.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from './header/header.component';


const routes : Routes =
[
  {path:'', redirectTo:'/home', pathMatch: 'full'},
  {path:'home', component:HeaderComponent},
  {path:'about', component:AboutComponent},
  {path: 'details', component:DetailsComponent},
  {path:'place', component:PlaceComponent},
  {path:'orders', component:OrderComponent},
  {path:'login', component:LoginComponent}
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
