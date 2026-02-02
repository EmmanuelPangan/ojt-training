import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AvailabilityStatusPipe } from './availability-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AvailabilityStatusPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
