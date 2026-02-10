import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CustomPipe } from "./custom.pipe";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { HomeComponent } from "./pages/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule, Routes } from "@angular/router";
import { ExcerciseComponent } from "./excercise/excercise.component";
import { ListcomponentComponent } from "./listcomponent/listcomponent.component";
import { DetailComponent } from "./detail/detail.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { AddressComponent } from "./address/address.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { TodolistComponent } from './todolist/todolist.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomPipe,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    ExcerciseComponent,
    ListcomponentComponent,
    DetailComponent,
    LoginComponent,
    PagenotfoundComponent,
    AddressComponent,
    TodolistComponent,
    RegisterComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
