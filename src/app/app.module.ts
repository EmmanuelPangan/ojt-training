import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AvailabilityStatusPipe } from './availability-status.pipe';
import { HeadComponent } from './head/head.component';
import { FootComponent } from './foot/foot.component';
import { AppRoutingModule } from './app-routing.module';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';
import { PlaceComponent } from './place/place.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AvailabilityStatusPipe,
    HeadComponent,
    FootComponent,
    LeftSidebarComponent,
    LoginComponent,
    DetailsComponent,
    AboutComponent,
    PlaceComponent,
    OrderComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
