import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { PlaceComponent } from './place/place.component';
import { HeaderComponent } from './header/header.component';

const routes : Routes =
[
  {path:'about', component:AboutComponent},
  {path: 'details', component:DetailsComponent},
  {path:'place', component:PlaceComponent}
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
