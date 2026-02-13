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
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddTaskComponent } from './order/add-task/add-task.component';
import { EditTaskComponent } from './order/edit-task/edit-task.component';
import { FormsModule } from '@angular/forms';
import { DeleteTaskComponent } from './order/delete-task/delete-task.component';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { CompletedTaskComponent } from './order/completed-task/completed-task.component';
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
    AlertMessageComponent,
    PageNotFoundComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    CompletedTaskComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
