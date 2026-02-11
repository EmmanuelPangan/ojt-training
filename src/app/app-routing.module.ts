import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { ExcerciseComponent } from "./excercise/excercise.component";
import { ListcomponentComponent } from "./listcomponent/listcomponent.component";
import { DetailComponent } from "./detail/detail.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { AddressComponent } from "./address/address.component";
import { TodolistComponent } from './todolist/todolist.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "excercise",
    component: ExcerciseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "listcomponent",
    component: ListcomponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "detailcomponent",
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "interpolation",
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "todolist",
    component: TodolistComponent,
    canActivate: [AuthGuard]
  },
  { path: '', component: ListcomponentComponent },
  { path: "detail/:id", component: DetailComponent },
  { path: "address", component: AddressComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
